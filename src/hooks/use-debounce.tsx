import type { DependencyList } from 'react';
import { useEffect } from 'react';

import useTimeoutFn from './use-timeout-fn';

export type UseDebounceReturn = [() => boolean | null, () => void];

export default function useDebounce(
  fn: () => void | unknown,
  ms: number = 0,
  deps: DependencyList = [],
): UseDebounceReturn {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);

  useEffect(reset, deps);

  return [isReady, cancel];
}
