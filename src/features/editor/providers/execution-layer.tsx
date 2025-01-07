import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

import useDebounce from '@/hooks/use-debounce';
import useTimeoutFn from '@/hooks/use-timeout-fn';

import { useUntrustedMode } from '../hooks/use-untrusted-mode';
import { useCodeStore, useLogsStore } from '../stores/editor';
import { useSettingsStore } from '../stores/settings';
import { runJs, stopJs } from '../utils/engine/controller';

const DEFAULT_OVERFLOW_TIMEOUT = 4000;

export type ExecutionStatusType = 'idle' | 'waiting' | 'running' | 'overflow';

type ExecutionLayerState = {
  status: ExecutionStatusType;
  runExec: () => void;
  stopExec: () => void;
};

const initialState: ExecutionLayerState = {
  status: 'idle',
  runExec: () => null,
  stopExec: () => null,
};

export const ExecutionLayerContext =
  createContext<ExecutionLayerState>(initialState);

interface Props {
  children: React.ReactNode;
}

// eslint-disable-next-line max-lines-per-function
export const ExecutionLayerProvider: React.FC<Props> = ({ children }) => {
  const { persist_logs, auto_run, auto_run_timeout } = useSettingsStore();
  const { code } = useCodeStore();
  const { clearLogs } = useLogsStore();
  const { isUntrustedMode, isUnedited } = useUntrustedMode();

  const [status, setStatus] = useState<ExecutionStatusType>(
    initialState.status,
  );

  const [_1, cancelOveflowTimeout, resetOverflowTimeout] = useTimeoutFn(() => {
    if (!(status === 'running')) return;
    setStatus('overflow');
  }, DEFAULT_OVERFLOW_TIMEOUT);

  const [isReadyAutoRunDebounce, cancelAutoRunDebounce] = useDebounce(
    () => {
      if (
        status !== 'running' &&
        status !== 'overflow' &&
        auto_run &&
        !isUnedited &&
        !isUntrustedMode
      ) {
        runExec();
      }
    },
    auto_run_timeout,
    [code],
  );

  useEffect(() => {
    const isReady = isReadyAutoRunDebounce();
    if (
      typeof isReady === 'boolean' &&
      !isReady &&
      auto_run &&
      !isUnedited &&
      !isUntrustedMode
    ) {
      setStatus('waiting');
    }
  }, [isReadyAutoRunDebounce, code]);

  useEffect(() => {
    if (!auto_run) {
      cancelAutoRunDebounce();
    }
  }, [auto_run]);

  const runExec = async () => {
    try {
      if (code.length === 0) {
        throw '01';
      }
      if (status === 'running' || status === 'overflow') {
        stopJs();
      }
      resetOverflowTimeout();
      if (!persist_logs) clearLogs();
      setStatus('running');
      await runJs(code);
    } catch (e) {
      console.error(e);
      if (e === '01') {
        toast.warning('Nothing to execute!');
      }
    } finally {
      resetExecutionLayer();
    }
  };

  const stopExec = () => {
    stopJs();
    resetExecutionLayer();
  };

  const resetExecutionLayer = () => {
    setStatus('idle');
    cancelOveflowTimeout();
    cancelAutoRunDebounce();
  };

  const value = {
    status,
    runExec,
    stopExec,
  };

  return (
    <ExecutionLayerContext.Provider value={value}>
      {children}
    </ExecutionLayerContext.Provider>
  );
};
