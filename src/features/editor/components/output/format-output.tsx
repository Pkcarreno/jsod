import React from 'react';

import type { Loggable } from '@/features/editor/types';

import { JsonView } from './json-view-wrapper';

interface Props {
  value: Loggable;
}

export const FormatOutput: React.FC<Props> = ({ value }) => {
  if (typeof value === 'string') {
    return <span className="whitespace-pre-wrap break-all">{value}</span>;
  }

  if (value && Array.isArray(value) && value.length > 0) {
    return value.map((subValue, index) => {
      if (subValue && typeof subValue === 'string') {
        return (
          <div key={`string-${index}`} className="w-fit">
            <span className="whitespace-pre-wrap break-all">{subValue}</span>
          </div>
        );
      }

      if (subValue && typeof subValue === 'number') {
        return (
          <div key={`number-${index}`}>
            <span className="w-fit text-[var(--w-rjv-key-number)]">
              {subValue}
            </span>
          </div>
        );
      }

      if (
        subValue &&
        (typeof subValue === 'object' || Array.isArray(subValue))
      ) {
        return (
          <div key={`object-${index}`} className="w-fit">
            <JsonView value={subValue} />
          </div>
        );
      }
    });
  }

  if (value && (typeof value === 'object' || Array.isArray(value))) {
    return (
      <div className="w-fit">
        <JsonView value={value} />
      </div>
    );
  }

  if (value && Array.isArray(value) && value.length === 0) {
    return (
      <div>
        <span className="text-muted-foreground italic">empty</span>
      </div>
    );
  }

  // return <>{value}</>;
};
