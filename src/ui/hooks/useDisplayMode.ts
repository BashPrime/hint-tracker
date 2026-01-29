import { displayModeState } from '@/states/App.states';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

export function useDisplayMode() {
  // !STATE
  const displayMode = useAtomValue(displayModeState);

  // !HOOK
  useEffect(() => {
    if (displayMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [displayMode]);
}
