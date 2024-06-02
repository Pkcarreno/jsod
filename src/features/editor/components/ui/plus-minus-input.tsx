import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import React from 'react';

import { Button } from '@/components/ui/button';

import { useInterval } from '../../hooks/use-interval';

interface PlusMinusInput {
  value: number;
  onChange: (value: number) => void;
  interval?: number;
  renderValue?: (value: number) => JSX.Element | string;
  delay?: number;
}

export const PlusMinusInput: React.FC<PlusMinusInput> = ({
  value,
  onChange,
  delay = 250,
  interval = 1,
  renderValue,
}) => {
  const { startIntervalAction, stopInterval } = useInterval();

  return (
    <div className="flex gap-2">
      <Button
        size="icon"
        variant="outline"
        onMouseDown={() =>
          startIntervalAction(() => onChange(-interval), delay)
        }
        onMouseUp={stopInterval}
        onMouseLeave={stopInterval}
        onClick={() => onChange(-interval)}
      >
        <MinusIcon className="size-3" />
      </Button>
      <div className="flex grow items-center justify-center rounded-md border">
        {renderValue ? renderValue(value) : String(value)}
      </div>
      <Button
        size="icon"
        variant="outline"
        onMouseDown={() => startIntervalAction(() => onChange(interval), delay)}
        onMouseUp={stopInterval}
        onMouseLeave={stopInterval}
        onClick={() => onChange(interval)}
      >
        <PlusIcon className="size-3" />
      </Button>
    </div>
  );
};
