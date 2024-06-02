import React from 'react';

import type { baseErrorObj, consoleOutput, log } from '@/features/editor/types';

import { LogItem } from './log-item';

function isError(obj: unknown) {
  if (!(typeof obj === 'object' && !Array.isArray(obj) && obj !== null)) {
    return false;
  }

  if (!('message' in obj) || !('name' in obj)) {
    return false;
  }

  const tiposErrorValido = [
    'EvalError',
    'RangeError',
    'ReferenceError',
    'SyntaxError',
    'InternalError',
    'TypeError',
  ];
  if (!tiposErrorValido.includes(obj.name as string)) {
    return false;
  }

  return true;
}

interface CustomLog extends Omit<log, 'type'> {
  type: consoleOutput['type'];
}

interface Props {
  log: CustomLog;
}

export const LogRenderer: React.FC<Props> = ({ log }) => {
  const { value, repeats, type, duration } = log;

  if (
    type === 'systemError' &&
    value &&
    Array.isArray(value) &&
    value[0] &&
    isError(value[0])
  ) {
    const error = value[0] as baseErrorObj;
    return (
      <div className="py-0.5">
        <LogItem
          type="error"
          value={`${error?.name}: ${error?.message}`}
          repeats={repeats}
          duration={duration}
          details={error?.lineNumber && `line ${error?.lineNumber}`}
        />
      </div>
    );
  }

  if (type === 'systemError' && value && isError(value)) {
    const error = value as baseErrorObj;
    return (
      <div className="py-0.5">
        <LogItem
          type="error"
          value={`${error?.name}: ${error?.message}`}
          repeats={repeats}
          duration={duration}
          details={error?.lineNumber && `line ${error?.lineNumber}`}
        />
      </div>
    );
  }

  return (
    <div className="py-0.5">
      <LogItem
        type={type}
        value={value}
        repeats={repeats}
        duration={duration}
      />
    </div>
  );
};
