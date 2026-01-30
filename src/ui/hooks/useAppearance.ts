import { appearanceState } from '@/states/App.states';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

export function useAppearance() {
  // !STATE
  const appearance = useAtomValue(appearanceState);

  // !HOOK
  useEffect(() => {
    if (appearance === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [appearance]);
}
