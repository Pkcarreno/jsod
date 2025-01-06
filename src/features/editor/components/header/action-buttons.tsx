import { PauseIcon, PlayIcon } from '@radix-ui/react-icons';
import { useAnimate } from 'motion/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useUntrustedMode } from '@/features/editor/hooks/use-untrusted-mode';
import { useCodeStore, useLogsStore } from '@/features/editor/stores/editor';
import { useSettingsStore } from '@/features/editor/stores/settings';
import useDebounce from '@/hooks/use-debounce';
import useTimeoutFn from '@/hooks/use-timeout-fn';
import { cn } from '@/lib/utils';

import { runJs, stopJs } from '../../utils/engine/controller';

export const ActionButtons = () => {
  const { persist_logs, auto_run, auto_run_timeout } = useSettingsStore();
  const { code } = useCodeStore();
  const { clearLogs } = useLogsStore();
  const [isExecuting, setIsExecuting] = useState(false);
  const { isUntrustedMode, isUnedited } = useUntrustedMode();
  const [showStopButton, setShowStopButton] = useState(false);

  const [, cancelShowStopButtonTimeout, resetStopButtonTimeout] = useTimeoutFn(
    () => {
      if (!isExecuting) return;
      setShowStopButton(true);
    },
    500,
  );
  const [, cancelAutoRunDebounce] = useDebounce(
    () => {
      if (auto_run && !isUnedited && !isUntrustedMode) {
        handleRunCode();
      }
    },
    auto_run_timeout,
    [code],
  );
  const handleRunCode = async () => {
    try {
      resetStopButtonTimeout();
      if (!persist_logs) clearLogs();
      setIsExecuting(true);
      await runJs(code);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExecuting(false);
      clearStopButtonState();
    }
  };
  useEffect(() => {
    if (!auto_run) {
      cancelAutoRunDebounce();
    }
  }, [auto_run]);
  const clearStopButtonState = () => {
    setShowStopButton(false);
    cancelShowStopButtonTimeout();
  };
  const stopExecution = () => {
    stopJs();
    setIsExecuting(false);
    clearStopButtonState();
  };

  const currentState = useMemo(() => {
    if (isExecuting && showStopButton) return 'overflow';
    if (isExecuting && !showStopButton) return 'running';

    return 'idle';
  }, [isExecuting, showStopButton]);

  return (
    <AnimatedActionButton
      state={currentState}
      stopExec={stopExecution}
      runExec={handleRunCode}
    />
  );
};

type StateType = 'idle' | 'waiting' | 'running' | 'overflow';

export type AnimatedActionButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    state: StateType;
    stopExec: () => void;
    runExec: () => void;
  };

export const AnimatedActionButton: React.FC<AnimatedActionButtonProps> = ({
  state,
  runExec,
  stopExec,
}) => {
  useEffect(() => {
    console.log('state', state);
  }, [state]);

  const scope = useButtonAnimation(state);

  const isDisabled = useMemo(() => {
    if (state === 'running') return true;
    return false;
  }, [state]);

  const handleExecution = useCallback(() => {
    if (state === 'idle') return runExec();
    return stopExec();
  }, [state, stopExec, runExec]);

  const classNamesByState = useMemo(() => {
    if (state === 'overflow')
      return 'bg-destructive text-destructive-foreground shadow-sm hover:!bg-destructive/90';

    return 'bg-primary text-primary-foreground shadow hover:!bg-primary/90';
  }, [state]);

  return (
    <div ref={scope}>
      <button
        className={cn(
          'focus-visible:ring-ring [&_svg]:shrink-0" inline-flex size-9 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4',
          classNamesByState,
        )}
        onClick={handleExecution}
        disabled={isDisabled}
      >
        <PauseIcon id="icon-pause" className="size-5" />
        <PlayIcon id="icon-play" className="size-5" />
      </button>
    </div>
  );
};

const useButtonAnimation = (state: StateType) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    switch (state) {
      case 'idle':
        animate([
          ['#icon-pause', { display: 'none', rotate: 90 }, { duration: 0.1 }],
          ['#icon-play', { display: 'inline', rotate: 0 }, { duration: 0.2 }],
          [
            'button',
            {
              backgroundColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              boxShadow:
                '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            },
            { duration: 0.3, at: '>' },
          ],
        ]);
        break;
      case 'running':
        animate([
          ['#icon-pause', { display: 'none', rotate: 90 }, { duration: 0.1 }],
          ['#icon-play', { display: 'inline', rotate: 0 }, { duration: 0.2 }],
          [
            'button',
            {
              backgroundColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              boxShadow:
                '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            },
            { duration: 0.3, at: '>' },
          ],
        ]);
        break;
      case 'overflow':
        animate([
          ['#icon-play', { display: 'none', rotate: 90 }, { duration: 0.1 }],
          ['#icon-pause', { display: 'inline', rotate: 0 }, { duration: 0.2 }],
          [
            'button',
            {
              backgroundColor: 'hsl(var(--destructive))',
              color: 'hsl(var(--destructive-foreground))',
              boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
            },
            { duration: 0.3, at: '>' },
          ],
        ]);
        break;
    }
  }, [state]);

  return scope;
};
