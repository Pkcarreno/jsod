import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { createSelectors } from '@/lib/utils';

import { queryStorage } from '../../api/query-storage';

interface Metadata {
  title?: string;
}

interface CodeState extends Metadata {
  code: string;
  setCode: (code: string) => void;
  setMetadata: (value: Metadata) => void;
}

const _useCodeStore = create<CodeState>()(
  persist(
    (set) => ({
      title: undefined,
      code: '',
      setCode: (code) => set({ code: code }),
      setMetadata: (meta) =>
        set({
          title: meta?.title,
        }),
    }),
    {
      name: 'code',
      storage: createJSONStorage(() => queryStorage),
    },
  ),
);

export const useCodeStore = createSelectors(_useCodeStore);
