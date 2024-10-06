import { CONSOLE_AVAILABLE_HANDLERS } from '@/features/editor/config/constants';
import type {
  consoleAvailableHandlers,
  Loggable,
  remoteControlerInsideWorker,
  remoteControlerOutsideWorker,
  SystemError,
} from '@/features/editor/types';

import { rfdc } from './../rfdc';
import { disposeQuickJS, executeCode } from './runtime';

let startTimeRef: number | undefined;

const startTimer = () => {
  startTimeRef = Date.now();
};

const getTimeSinceExecutionBegan = () =>
  startTimeRef ? Date.now() - startTimeRef : 0;

const postMessage: (params: remoteControlerOutsideWorker) => void =
  self.postMessage;

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
          const evaluationResult = await executeCode({
            code: userCode.trim(),
            options: {
              exposeGlobals: exposeGlobals,
              startTimer: startTimer,
            },
          });

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
