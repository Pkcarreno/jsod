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
  | Error;

export type baseErrorObj = {
  message: string;
  name: string;
  stack?: string;
  lineNumber?: string;
};

export type SystemError =
  | string
  | SyntaxError
  | Error
  | {
      message: string;
      name: string;
      stack: string;
    };

type baseLog = {
  duration: number;
  repeats: number;
};

type baseConsoleOutput = {
  type: consoleAvailableHandlers;
  value: Loggable;
};

export type consoleOutput = baseConsoleOutput | consoleOutputSystemError;
type consoleOutputSystemError = {
  type: 'systemError';
  value: SystemError;
};

export type log = consoleOutput & baseLog;
export type logWithoutSystemError = baseConsoleOutput & baseLog;

export type remoteControlerOutsideWorker =
  | {
      command: 'log';
      data: Pick<logWithoutSystemError, 'type' | 'value' | 'duration'>;
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

export type remoteControlerInsideWorker =
  | {
      command: 'run';
      code: string;
    }
  | {
      command: 'dispose';
    };
