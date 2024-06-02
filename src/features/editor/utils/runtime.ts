import type {
  logWithoutSystemError,
  remoteControlerInsideWorker,
  remoteControlerOutsideWorker,
  SystemError,
} from '@/features/editor/types';

import { appendLogs } from '../stores/editor';
import { SettingsLoopSafeguardTimeout } from '../stores/settings';

let workerRef: Worker | undefined = undefined;
let timeoutIdRef: ReturnType<typeof setInterval> | undefined = undefined;

const workerPostMessage: () => (params: remoteControlerInsideWorker) => void =
  () => (params) =>
    workerRef && (workerRef as Worker).postMessage(params);

export function stopJs() {
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

export function runJs(code: string) {
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./eval.ts', import.meta.url), {
      type: 'module',
    });
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
          console.log('data:', data.data, 'duration:', data.duration);
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

    console.log('apunto de ejecutar al worker');
    workerPostMessage()({ command: 'run', code: code });
  });
}
