import { create } from 'zustand';

import type { log } from '@/features/editor/types';
import { createSelectors } from '@/lib/utils';

import LinkedLogs from '../../lib/linked-log';

const logsList = new LinkedLogs();

interface LogsState {
  logs: log[];
  isFirstTime: boolean;
  appendLogs: (logs: log) => void;
  clearLogs: () => void;
}

const _useLogsStore = create<LogsState>((set) => ({
  logs: [],
  isFirstTime: true,
  appendLogs: (log: log) => {
    logsList.append(log);
    set({
      logs: logsList.getAllLogsInArray(),
      isFirstTime: false,
    });
  },
  clearLogs: () => {
    logsList.clearFirst();
    set({ logs: [] });
  },
}));

export const useLogsStore = createSelectors(_useLogsStore);

export const appendLogs = (log: log) =>
  _useLogsStore.getState().appendLogs(log);
