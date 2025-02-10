import { useCallback, useEffect, useRef } from 'react';

export const useDebounce = <T extends unknown[]>(func: (...args: T) => void | Promise<void>, wait = 1000) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const debouncedCallback = useCallback(
    (...args: T) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => {
        void func(...args);
      }, wait);
    },
    [func, wait],
  );

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return debouncedCallback;
};
