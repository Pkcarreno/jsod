/* eslint-disable no-async-promise-executor */
import type { QuickJSContext } from 'quickjs-emscripten-core';
import { Arena } from 'quickjs-emscripten-sync';

import type {
  Loggable,
  remoteControlerInsideWorkerOptions,
  SystemError,
} from '../../types';
import { DebugLog, DebugLogVoid } from '../debug';
import { getQuickJS } from '../quick-js';

let arenaRef: Arena;
let ctxRef: QuickJSContext;

let DEBUG = DebugLogVoid;

export const disposeQuickJS = () => {
  DEBUG('dispose arena and ctx');
  if (arenaRef) {
    arenaRef.dispose();
  }
  if (ctxRef) {
    ctxRef.dispose();
  }
};

const ERROR_PROPERTIES = [
  'name',
  'message',
  'fileName',
  'lineNumber',
  'columnNumber',
  'stack',
];

const poblateErrorObj = (error: Error): Record<string, unknown> => {
  const newObj = {} as Record<string, unknown>;
  ERROR_PROPERTIES.forEach((p) => {
    if (error[p as keyof Error]) {
      newObj[p as keyof Error] = error[p as keyof Error];
    }
  });
  return newObj;
};

function serializeError(
  error: Error | Record<string, unknown>,
): Record<string, unknown> {
  let fixedError = { ...error };
  if ('{}' === JSON.stringify(fixedError)) {
    fixedError = poblateErrorObj(error as Error);
  }
  return fixedError;
}

type executeCodeOutputTypes =
  | {
      status: 'success';
      data?: Loggable;
    }
  | {
      status: 'error';
      data: SystemError;
    };

interface executeCodeOptionsProps extends remoteControlerInsideWorkerOptions {
  exposeGlobals: Record<string, unknown>;
  startTimer: () => void;
}

interface executeCodeProps {
  code: string;
  options: executeCodeOptionsProps;
}

export const executeCode: (
  data: executeCodeProps,
) => Promise<executeCodeOutputTypes> = async ({ code, options }) => {
  const { exposeGlobals, startTimer, loopThreshold, debugMode } = options;

  DEBUG = debugMode ? DebugLog : DebugLogVoid;

  return new Promise(async (resolve, reject) => {
    try {
      DEBUG('start eval');
      const ctx = await getQuickJS().then((deps) => {
        return deps.newContext();
      });

      if (!ctx) reject({ success: false, error: 'no context' });
      ctxRef = ctx;

      let interruptCycles = 0;
      ctx.runtime.setMemoryLimit(1024 * 640);
      ctx.runtime.setMaxStackSize(1024 * 320);
      ctx.runtime.setInterruptHandler(() => {
        DEBUG('interrupt handler triggered. time: ', interruptCycles);
        return ++interruptCycles > loopThreshold;
      });

      const arena = new Arena(ctx, {
        isMarshalable: true,
      });
      arenaRef = arena;

      DEBUG('expose functions');
      arena.expose(exposeGlobals);

      DEBUG('eval the code');
      startTimer();
      const result = await arena.evalCode(code);

      DEBUG('execute pending jobs');
      arena.executePendingJobs();

      let error = undefined;
      let success = undefined;

      DEBUG('check output status', result);
      if (result) {
        if (result.error) {
          error = ctx.dump(result.error);
          result.error.dispose();
          disposeQuickJS();
          resolve({ status: 'error', data: error });
        }
        if (result.value) {
          success = ctx.dump(result.value);
          result.value.dispose();
          disposeQuickJS();
          resolve({ status: 'success', data: success });
        }
        if (result && !result.error && !result.value) {
          success = result;
          disposeQuickJS();
          resolve({ status: 'success', data: success });
        }
      } else {
        disposeQuickJS();
        resolve({ status: 'success' });
      }

      if (error) {
        throw error;
      }
    } catch (error) {
      const fixedError = serializeError(error as Error);
      reject({ status: 'error', data: fixedError });
    }
  });
};
