/* eslint-disable no-async-promise-executor */
import type { QuickJSContext } from 'quickjs-emscripten-core';
import { Arena } from 'quickjs-emscripten-sync';

import { CONSOLE_AVAILABLE_HANDLERS } from '@/features/editor/config/constants';
import type {
  consoleAvailableHandlers,
  Loggable,
  remoteControlerInsideWorker,
  remoteControlerOutsideWorker,
  SystemError,
} from '@/features/editor/types';

import { getQuickJS } from './quick-js';
import { rfdc } from './rfdc';

let startTimeRef: number | undefined;

const postMessage: (params: remoteControlerOutsideWorker) => void =
  self.postMessage;

let arenaRef: Arena;
let ctxRef: QuickJSContext;

const disposeQuickJS = () => {
  console.log('dispose arena and ctx');
  if (arenaRef) {
    arenaRef.dispose();
  }
  if (ctxRef) {
    ctxRef.dispose();
  }
};

const getTimeSinceExecutionBegan = () =>
  startTimeRef ? Date.now() - startTimeRef : 0;

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

const handleLogType = (type: consoleAvailableHandlers) => {
  return (...args: unknown[]) => {
    const clonedArgs = args.map(rfdc) as Loggable;
    postMessage({
      command: 'log',
      data: {
        type: type,
        duration: getTimeSinceExecutionBegan(),
        value: clonedArgs,
      },
    });
  };
};

const generateConsoleObj = (): Record<consoleAvailableHandlers, () => void> => {
  const obj: Record<consoleAvailableHandlers, () => void> = {} as Record<
    consoleAvailableHandlers,
    () => void
  >;
  CONSOLE_AVAILABLE_HANDLERS.forEach((type) => {
    obj[type] = handleLogType(type);
  });
  return obj;
};

const consoleHandler: Record<consoleAvailableHandlers, () => void> =
  generateConsoleObj();

// TODO: get unsupported console handlers and show error message
// const proxyConsoleHandler = new Proxy(consoleHandler, {
//   get: function (target, property) {
//     return handleLogType('undefined');
//   },
// });

const setTimeoutHandler = <F extends (...args: unknown[]) => unknown>(
  callback: F,
  timeout?: number,
  ...args: Parameters<F>
) => {
  return setTimeout(callback, timeout, ...args);
};

const setIntervalHandler = <F extends (...args: unknown[]) => unknown>(
  callback: F,
  timeout?: number,
  ...args: Parameters<F>
) => {
  return setInterval(callback, timeout, ...args);
};

const clearTimeoutHandler = (timerRef: ReturnType<typeof setTimeout>) => {
  clearTimeout(timerRef);
};

const clearIntervalHandler = (timerRef: ReturnType<typeof setInterval>) => {
  clearInterval(timerRef);
};

const UrlHandler = URL;

const exposeGlobals = {
  console: consoleHandler,
  setTimeout: setTimeoutHandler,
  setInterval: setIntervalHandler,
  clearTimeout: clearTimeoutHandler,
  clearInterval: clearIntervalHandler,
  URL: UrlHandler,
};

type EvalCode =
  | {
      status: 'success';
      data?: Loggable;
    }
  | {
      status: 'error';
      data: SystemError;
    };

async function evalUserCode(code: string): Promise<EvalCode> {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('start eval');
      const ctx = await getQuickJS().then((deps) => {
        return deps.newContext();
      });

      if (!ctx) reject({ success: false, error: 'no context' });
      ctxRef = ctx;

      let interruptCycles = 0;
      ctx.runtime.setMemoryLimit(1024 * 640);
      ctx.runtime.setMaxStackSize(1024 * 320);
      ctx.runtime.setInterruptHandler(() => {
        return ++interruptCycles > 10;
      });

      const arena = new Arena(ctx, {
        isMarshalable: true,
      });
      arenaRef = arena;

      console.log('expose functions');
      arena.expose(exposeGlobals);

      console.log('eval the code');
      startTimeRef = Date.now();
      const result = await arena.evalCode(code);

      console.log('execute pending jobs');
      arena.executePendingJobs();

      let error = undefined;
      let success = undefined;

      console.log('check output status', result);
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
}

self.onmessage = async function ({
  data,
}: {
  data: remoteControlerInsideWorker;
}) {
  switch (data.command) {
    case 'run':
      try {
        const userCode = data.code;
        if (userCode.trim().length > 0) {
          const evaluationResult = await evalUserCode(userCode.trim());

          switch (evaluationResult.status) {
            case 'success':
              postMessage({ command: 'result', data: evaluationResult.data });
              break;
            case 'error':
              postMessage({
                command: 'error',
                data: evaluationResult.data,
                duration: getTimeSinceExecutionBegan(),
              });
              break;
            default:
              postMessage({
                command: 'error',
                data: 'evaluation response unhandled',
                duration: getTimeSinceExecutionBegan(),
              });
              break;
          }
        } else {
          postMessage({
            command: 'error',
            data: 'There is no code that can be evaluated.',
            duration: getTimeSinceExecutionBegan(),
          });
        }
      } catch (err: unknown) {
        const error = err as { data: SystemError };
        postMessage({
          command: 'error',
          data: error.data,
          duration: getTimeSinceExecutionBegan(),
        });
      } finally {
        startTimeRef = undefined;
      }
      break;
    case 'dispose':
      disposeQuickJS();
      break;
    default:
      postMessage({ command: 'error', data: 'Not valid execution command.' });
      break;
  }
};
