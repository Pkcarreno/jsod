import { useEffect, useRef } from 'react';

export const useInterval = () => {
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopInterval = () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  };

  const startIntervalAction = (action: () => void, delay = 250) => {
    if (interval.current) return;
    interval.current = setInterval(() => {
      if (action) action();
    }, delay);
  };

  useEffect(() => {
    return () => stopInterval();
  }, []);

  return { interval, stopInterval, startIntervalAction };
};
