import type { CONSOLE_AVAILABLE_HANDLERS } from '../config/constants';

export type consoleAvailableHandlers =
  (typeof CONSOLE_AVAILABLE_HANDLERS)[number];

export type Loggable =
  | string
  | number
  | boolean
  | null
  | undefined
  | { array: Loggable[] }
  | { function: string }
  | { error: string; stack: string }
  | (Record<string, Loggable> | undefined)[]
  | Loggable[]
  | Error
  | baseErrorObj;

export type baseErrorObj = {
  message: string;
  name: string;
  stack?: string;
  lineNumber?: string;
};
export type SystemError = string | SyntaxError | Error | baseErrorObj;

export type Log = {
  internalError?: boolean;
  type: consoleAvailableHandlers;
  duration: number;
  repeats: number;
  value: Loggable;
  detail?: string;
};

export type remoteControlerOutsideWorker =
  | {
      command: 'log';
      data: Pick<Log, 'type' | 'value' | 'duration'>;
    }
  | {
      command: 'error';
      data: SystemError;
      duration?: number;
    }
  | {
      command: 'result';
      data?: Loggable;
    };

export type remoteControlerInsideWorkerOptions = {
  loopThreshold: number;
  debugMode: boolean;
};

export type remoteControlerInsideWorker =
  | {
      command: 'run';
      code: string;
      options: remoteControlerInsideWorkerOptions;
    }
  | {
      command: 'dispose';
    };
