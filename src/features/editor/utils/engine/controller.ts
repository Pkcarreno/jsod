import type {
  logWithoutSystemError,
  remoteControlerInsideWorker,
  remoteControlerOutsideWorker,
  SystemError,
} from '@/features/editor/types';

import { appendLogs } from '../../stores/editor';
import {
  SettingsDebugMode,
  SettingsLoopSafeguardThreshold,
  SettingsLoopSafeguardTimeout,
} from '../../stores/settings';
import { DebugLog, DebugLogVoid } from '../debug';

let workerRef: Worker | undefined = undefined;
let timeoutIdRef: ReturnType<typeof setInterval> | undefined = undefined;
let DEBUG = DebugLogVoid;

const workerPostMessage: () => (params: remoteControlerInsideWorker) => void =
  () => (params) =>
    workerRef && (workerRef as Worker).postMessage(params);

export function stopJs() {
  DEBUG('stop execution');
  if (workerRef) {
    workerPostMessage()({ command: 'dispose' });
    workerRef.terminate();
    workerRef = undefined;
  }
  if (timeoutIdRef) {
    clearTimeout(timeoutIdRef);
  }
  return true;
}

// eslint-disable-next-line max-lines-per-function
export function runJs(code: string) {
  const startTime = Date.now();
  const debugMode = SettingsDebugMode();

  DEBUG = debugMode ? DebugLog : DebugLogVoid;

  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL('./execution-manager.ts', import.meta.url),
      {
        type: 'module',
      },
    );
    workerRef = worker;

    const logError = (message: SystemError, duration: number = 0) => {
      appendLogs({
        type: 'systemError',
        value: message,
        duration: duration,
        repeats: 1,
      });
    };

    const logger = (
      log: Pick<logWithoutSystemError, 'type' | 'value' | 'duration'>,
    ) => {
      appendLogs({
        type: log.type,
        value: log.value,
        duration: log.duration,
        repeats: 1,
      });
    };

    timeoutIdRef = setTimeout(() => {
      stopJs();
      logError('Process terminated to avoid infinite loop');

      const executionTime = Date.now() - startTime;
      reject(new Error(`Execution timed out after ${executionTime}ms`));
    }, SettingsLoopSafeguardTimeout());

    worker.onmessage = function ({
      data,
    }: {
      data: remoteControlerOutsideWorker;
    }) {
      switch (data.command) {
        case 'log':
          logger(data.data);
          break;
        case 'error':
          DEBUG(
            'returning error. data:',
            data.data,
            'duration:',
            data.duration,
          );
          logError(data.data, data.duration);
          stopJs();
          reject(data.data);
          break;
        case 'result':
          stopJs();
          resolve(data.data);
          break;
      }
    };

    DEBUG('Start Execution');
    workerPostMessage()({
      command: 'run',
      code: code,
      options: {
        loopThreshold: SettingsLoopSafeguardThreshold(),
        debugMode,
      },
    });
  });
}
