import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { createSelectors } from '@/lib/utils';

import { queryStorage } from '../../api/query-storage';

interface CodeState {
  code: string;
  setCode: (code: string) => void;
}

const _useCodeStore = create<CodeState>()(
  persist(
    (set) => ({
      code: '',
      setCode: (code) => set({ code: code }),
    }),
    {
      name: 'code',
      storage: createJSONStorage(() => queryStorage),
    },
  ),
);

export const useCodeStore = createSelectors(_useCodeStore);
