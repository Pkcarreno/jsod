import React from 'react';

import type { Loggable } from '@/features/editor/types';

import { JsonView } from './json-view-wrapper';

interface Props {
  value: Loggable | Record<string, Loggable>;
  topLevel?: boolean;
}

export const FormatOutput: React.FC<Props> = ({ value, topLevel = true }) => {
  if (typeof value === 'string' && value === '') {
    return <span className="text-muted italic">empty</span>;
  }

  if (Array.isArray(value) && topLevel) {
    return value.map((subValue, index) => (
      <FormatOutput key={index} value={subValue} topLevel={false} />
    ));
  }

  if (typeof value === 'string') {
    return <span className="whitespace-pre-wrap break-all">{value}</span>;
  }

  if (typeof value === 'number') {
    return <span className="w-fit text-[hsl(var(--yell))]">{value}</span>;
  }

  if (value && (typeof value === 'object' || Array.isArray(value))) {
    return (
      <div className="my-auto w-fit">
        <JsonView value={value} />
      </div>
    );
  }

  if (!value) {
    return <span className="text-muted w-fit">{String(value)}</span>;
  }

  return <span>{String(value)}</span>;
};
