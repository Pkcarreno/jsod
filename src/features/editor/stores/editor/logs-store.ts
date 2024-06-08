import { create } from 'zustand';

import type { log } from '@/features/editor/types';
import { createSelectors } from '@/lib/utils';

import LinkedLogs from '../../lib/linked-log';

const logsList = new LinkedLogs();

interface LogsState {
  logs: log[];
  isFirstTime: boolean;
  alert: boolean;
  appendLogs: (logs: log) => void;
  clearLogs: () => void;
  clearAlert: () => void;
}

const _useLogsStore = create<LogsState>((set) => ({
  logs: [],
  isFirstTime: true,
  alert: false,
  appendLogs: (log: log) => {
    logsList.append(log);
    set({
      logs: logsList.getAllLogsInArray(),
      isFirstTime: false,
      alert: true,
    });
  },
  clearLogs: () => {
    logsList.clearFirst();
    set({ logs: [] });
  },
  clearAlert: () => {
    set({ alert: false });
  },
}));

export const useLogsStore = createSelectors(_useLogsStore);

export const appendLogs = (log: log) =>
  _useLogsStore.getState().appendLogs(log);
