import { create } from 'zustand';

import type { log } from '@/features/editor/types';
import { createSelectors } from '@/lib/utils';

interface LogsState {
  logs: log[];
  isFirstTime: boolean;
  appendLogs: (logs: log) => void;
  setLogs: (logs: log[]) => void;
  clearLogs: () => void;
}

const _useLogsStore = create<LogsState>((set) => ({
  logs: [],
  isFirstTime: true,
  appendLogs: (logs: log) =>
    set((state) => ({
      logs: [...state.logs, logs],
      isFirstTime: false,
    })),
  setLogs: (logs: log[]) => set({ logs, isFirstTime: false }),
  clearLogs: () => set({ logs: [] }),
}));

export const useLogsStore = createSelectors(_useLogsStore);

export const appendLogs = (log: log) =>
  _useLogsStore.getState().appendLogs(log);
