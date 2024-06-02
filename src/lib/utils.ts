import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { StoreApi, UseBoundStore } from 'zustand';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {} as Record<string, () => unknown>;
  for (const k of Object.keys(store.getState())) {
    (store.use as Record<string, () => unknown>)[k] = () =>
      store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export function onEventListener<
  T extends Window | Document | HTMLElement | EventTarget,
>(
  obj: T | null,
  ...args:
    | Parameters<T['addEventListener']>
    | [string, (event: BeforeUnloadEvent) => string | undefined, ...unknown[]]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(
      ...(args as Parameters<HTMLElement['addEventListener']>),
    );
  }
}

export function offEventListener<
  T extends Window | Document | HTMLElement | EventTarget,
>(
  obj: T | null,
  ...args:
    | Parameters<T['removeEventListener']>
    | [string, (event: BeforeUnloadEvent) => string | undefined, ...unknown[]]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(
      ...(args as Parameters<HTMLElement['removeEventListener']>),
    );
  }
}
