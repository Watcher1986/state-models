import { useEffect } from 'react';
import { hookstate, useHookstate } from '@hookstate/core';

export const seconds = hookstate(0);
export const running = hookstate(false);
export const names = hookstate<string[] | undefined>(undefined);

export const useStopwatch = () => {
  const secondsState = useHookstate(seconds);
  const runningState = useHookstate(running);

  useEffect(() => {
    if (runningState.get()) {
      const timer = setInterval(() => {
        secondsState.set((seconds) => seconds + 0.1);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [runningState.get()]);

  useEffect(() => {
    if (secondsState.get() > 2) {
      fetch('/names.json')
        .then((res) => res.json())
        .then((data) => names.set(data.names));
    }
  }, [secondsState.get() > 2]);
};
