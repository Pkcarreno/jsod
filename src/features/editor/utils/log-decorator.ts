import type { baseErrorObj, Log, Loggable } from '../types';

const getLogErrorValue = (
  internalError: Log['internalError'],
  value: Log['value'],
): Loggable => {
  if (internalError) {
    const error = value as baseErrorObj;

    return `${error?.name}: ${error?.message}`;
  }

  return value;
};

const getLogErrorDetail = (
  internalError: Log['internalError'],
  value: Log['value'],
): string | undefined => {
  if (internalError) {
    const error = value as baseErrorObj;

    if (error.name === 'InternalError') {
      if (error.message === 'interrupted') {
        return 'This error throw on intense usage of loops. If this is intended, you can workaround by increasing the loop threshold value in settings.';
      }
      if (error.message === 'timeout') {
        return 'Process terminated by timeout. If a longer execution is expected, you can workaround by increasing the loop timeout value in settings.';
      }
    }
  }

  return;
};

export const addLogDecorators = (log: Log): Log => {
  if (log.internalError) {
    const Log = structuredClone(log);

    Log.value = getLogErrorValue(log.internalError, log.value);
    Log.detail = getLogErrorDetail(log.internalError, log.value);

    return Log;
  }

  return log;
};
