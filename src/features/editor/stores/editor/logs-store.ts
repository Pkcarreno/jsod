import { create } from 'zustand';

import type { Log } from '@/features/editor/types';
import { createSelectors } from '@/lib/utils';

import LinkedLogs from '../../lib/linked-log';

const logsList = new LinkedLogs();

interface LogsState {
  logs: Log[];
  isFirstTime: boolean;
  alert: boolean;
  appendLogs: (logs: Log) => void;
  clearLogs: () => void;
  clearAlert: () => void;
}

const _useLogsStore = create<LogsState>((set) => ({
  logs: [],
  isFirstTime: true,
  alert: false,
  appendLogs: (log: Log) => {
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

export const appendLogs = (log: Log) =>
  _useLogsStore.getState().appendLogs(log);
