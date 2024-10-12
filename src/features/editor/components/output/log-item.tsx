import {
  CrossCircledIcon,
  InfoCircledIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import prettyMilliseconds from 'pretty-ms';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CONSOLE_AVAILABLE_HANDLERS } from '@/features/editor/config/constants';
import type { Log, Loggable, SystemError } from '@/features/editor/types';
import { cn } from '@/lib/utils';

import { FormatOutput } from './format-output';

const containerVariants = cva(
  'hover:bg-current/70 selection:bg-primary/30 rounded-sm px-3 py-1 transition-colors',
  {
    variants: {
      variant: {
        default:
          'text-foreground/80 hover:bg-secondary/40 dark:hover:bg-accent',
        log: 'text-foreground/80 hover:bg-secondary/40 dark:hover:bg-accent',
        debug: 'text-foreground/80 hover:bg-secondary/40 dark:hover:bg-accent',
        error:
          'bg-error/20 text-error-foreground hover:bg-error/30 dark:bg-error/30 dark:hover:bg-error/60',
        systemError:
          'bg-error/20 text-error-foreground hover:bg-error/30 dark:bg-error/30 dark:hover:bg-error/60',
        warn: 'bg-warning/20 text-warning-foreground hover:bg-warning/40 dark:bg-warning/30 dark:hover:bg-warning/60',
        info: 'bg-info/20 text-info-foreground hover:bg-info/40 dark:bg-info/30 dark:hover:bg-info/60',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  variant,
  ...props
}) => {
  return (
    <div
      className={cn('py-0.5', containerVariants({ variant, className }))}
      {...props}
    >
      {children}
    </div>
  );
};

interface IconSelectorProps {
  variant: string;
}

const IconSelector: React.FC<IconSelectorProps> = ({ variant }) => {
  if (variant === 'error') {
    return <CrossCircledIcon className="size-full" />;
  }

  if (variant === 'warn') {
    return <QuestionMarkCircledIcon className="size-full" />;
  }

  if (variant === 'info') {
    return <InfoCircledIcon className="size-full" />;
  }

  return null;
};

const REPEATS_TOLERANCE = 1;

interface ValueProps {
  variant: string;
  value: Loggable;
  repeats: number;
  duration: number;
}

const Value: React.FC<ValueProps> = ({ variant, value, repeats, duration }) => {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <div className="flex items-center gap-2">
        <div className="size-4">
          <IconSelector variant={variant} />
        </div>
        <div className="flex flex-wrap gap-1">
          <FormatOutput value={value} />
        </div>
      </div>
      <span className=" ml-auto flex gap-2 text-sm opacity-50">
        {repeats > REPEATS_TOLERANCE && (
          <Badge variant="secondary" className="px-2">
            {repeats}
          </Badge>
        )}
        {prettyMilliseconds(duration)}
      </span>
    </div>
  );
};

interface Props {
  type: Log['type'];
  value: Loggable | SystemError;
  repeats: number;
  duration: number;
  details?: React.ReactNode | string;
}

export const LogItem: React.FC<Props> = ({
  type,
  value,
  repeats,
  duration,
  details,
}) => {
  const isDetailsString = typeof details === 'string';

  const consoleAvailableHandlersAsString: readonly Log['type'][] =
    CONSOLE_AVAILABLE_HANDLERS;
  const isVariantTypeSupported =
    !!consoleAvailableHandlersAsString.includes(type);

  const variantType: Log['type'] | 'default' = isVariantTypeSupported
    ? type
    : 'default';

  return (
    <Container variant={variantType}>
      <Value
        variant={variantType}
        value={value}
        repeats={repeats}
        duration={duration}
      />
      <div className="pl-6">
        {details && isDetailsString ? <small>{details}</small> : <>{details}</>}
        {!isVariantTypeSupported && (
          <small>
            console type not supported,{' '}
            <Button
              variant="link"
              className="text-card-foreground dark:text-primary p-0"
              asChild
            >
              <a
                href="https://github.com/pkcarreno/jsod/issues"
                target="_blank"
              >
                please report it
              </a>
            </Button>
            .
          </small>
        )}
      </div>
    </Container>
  );
};
