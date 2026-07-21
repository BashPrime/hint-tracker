import { activePackState } from '@/states/App.states';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

export function useResetSize() {
  // !STATE
  const pack = useAtomValue(activePackState);

  useEffect(() => {
    // !IPC
    const cleanup = window.electronApi.resetSize(() => {
      window.electronApi.resetSizeResponse(pack?.id ?? null);
    });

    // Execute both cleanups when the component unmounts
    return () => {
      cleanup();
    };
  }, [pack]);
}
