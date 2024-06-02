import type { PanelGroupProps } from 'react-resizable-panels';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createSelectors } from '@/lib/utils';

export interface SettingsState {
  auto_run: boolean;
  auto_run_timeout: number;
  loop_safeguard_threshold: number;
  loop_safeguard_timeout: number;
  persist_logs: boolean;
  layout_direction: PanelGroupProps['direction'];
  isFirstTime: boolean;
  updateAutoRun: (value: boolean) => void;
  updateAutoRunTimeout: (value: number) => void;
  updateLoopSafeguardThreshold: (value: number) => void;
  updateLoopSafeguardTimeout: (value: number) => void;
  updatePersistLogs: (value: boolean) => void;
  updateLayoutDirection: (value: PanelGroupProps['direction']) => void;
  updateIsFirstTime: (value: boolean) => void;
}

const _useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      auto_run: false,
      auto_run_timeout: 1500,
      loop_safeguard_threshold: 10,
      loop_safeguard_timeout: 30000,
      persist_logs: false,
      layout_direction: 'horizontal',
      isFirstTime: true,
      updateAutoRun: (value) => set({ auto_run: value }),
      updateAutoRunTimeout: (value) => set({ auto_run_timeout: value }),
      updateLoopSafeguardThreshold: (value) =>
        set({ loop_safeguard_threshold: value }),
      updateLoopSafeguardTimeout: (value) =>
        set({ loop_safeguard_timeout: value }),
      updatePersistLogs: (value) => set({ persist_logs: value }),
      updateLayoutDirection: (value) => set({ layout_direction: value }),
      updateIsFirstTime: (value) => set({ isFirstTime: value }),
    }),
    {
      name: 'settings-storage',
    },
  ),
);

export const useSettingsStore = createSelectors(_useSettingsStore);

export const SettingsLoopSafeguardThreshold = () =>
  _useSettingsStore.getState().loop_safeguard_threshold;
export const SettingsLoopSafeguardTimeout = () =>
  _useSettingsStore.getState().loop_safeguard_timeout;
