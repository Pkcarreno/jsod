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
  vimMode: boolean;
  editorPlaceholder: boolean;
  debugMode: boolean;
  updateAutoRun: (value: boolean) => void;
  updateAutoRunTimeout: (value: number) => void;
  updateLoopSafeguardThreshold: (value: number) => void;
  updateLoopSafeguardTimeout: (value: number) => void;
  updatePersistLogs: (value: boolean) => void;
  updateLayoutDirection: (value: PanelGroupProps['direction']) => void;
  updateIsFirstTime: (value: boolean) => void;
  updateVimMode: (value: boolean) => void;
  updateEditorPlaceholder: (value: boolean) => void;
  updateDebugMode: (value: boolean) => void;
}

const _useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      auto_run: true,
      auto_run_timeout: 1500,
      loop_safeguard_threshold: 1000,
      loop_safeguard_timeout: 30000,
      persist_logs: false,
      layout_direction: 'horizontal',
      isFirstTime: false,
      vimMode: false,
      editorPlaceholder: true,
      debugMode: false,
      updateAutoRun: (value) => set({ auto_run: value }),
      updateAutoRunTimeout: (value) => set({ auto_run_timeout: value }),
      updateLoopSafeguardThreshold: (value) =>
        set({ loop_safeguard_threshold: value }),
      updateLoopSafeguardTimeout: (value) =>
        set({ loop_safeguard_timeout: value }),
      updatePersistLogs: (value) => set({ persist_logs: value }),
      updateLayoutDirection: (value) => set({ layout_direction: value }),
      updateIsFirstTime: (value) => set({ isFirstTime: value }),
      updateVimMode: (value) => set({ vimMode: value }),
      updateEditorPlaceholder: (value) => set({ editorPlaceholder: value }),
      updateDebugMode: (value) => set({ debugMode: value }),
    }),
    {
      name: 'settings-storage',
      version: 4,
      migrate: (persistedState, version) => {
        if (version === 0) {
          (persistedState as SettingsState).vimMode = false;
          (persistedState as SettingsState).debugMode = false;
          (persistedState as SettingsState).loop_safeguard_threshold = 1000;
        }
        if (version === 1) {
          (persistedState as SettingsState).auto_run = true;
        }
        if (version === 2) {
          (persistedState as SettingsState).editorPlaceholder = true;
        }
        if (version === 3) {
          (persistedState as SettingsState).editorPlaceholder = true;
          (persistedState as SettingsState).isFirstTime = false;
        }

        return persistedState;
      },
    },
  ),
);

export const useSettingsStore = createSelectors(_useSettingsStore);

export const SettingsLoopSafeguardThreshold = () =>
  _useSettingsStore.getState().loop_safeguard_threshold;
export const SettingsLoopSafeguardTimeout = () =>
  _useSettingsStore.getState().loop_safeguard_timeout;
export const SettingsDebugMode = () => _useSettingsStore.getState().debugMode;
