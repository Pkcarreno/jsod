import { PauseIcon, PlayIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useUntrustedMode } from '@/features/editor/hooks/use-untrusted-mode';
import { useCodeStore, useLogsStore } from '@/features/editor/stores/editor';
import { useSettingsStore } from '@/features/editor/stores/settings';
import useDebounce from '@/hooks/use-debounce';
import useTimeoutFn from '@/hooks/use-timeout-fn';

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

  if (isExecuting && showStopButton)
    return (
      <Button variant="destructive" className="gap-1" onClick={stopExecution}>
        <span className="font-semibold">Stop</span>
        <PauseIcon className="size-5" />
      </Button>
    );

  return (
    <Button
      className="gap-1"
      disabled={auto_run || isExecuting || isUntrustedMode}
      onClick={handleRunCode}
    >
      <span className="font-semibold">Play</span>
      <PlayIcon className="size-5" />
    </Button>
  );
};
