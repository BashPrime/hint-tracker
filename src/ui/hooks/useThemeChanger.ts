import { appearanceState, userAppearanceState } from '@/states/App.states';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

export function useThemeChanger() {
  // !STATE
  const appearance = useAtomValue(appearanceState);
  const userAppearance = useAtomValue(userAppearanceState);

  // !FUNCTION
  function handleThemeChange(theme: 'light' | 'dark') {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }

  // !HOOK
  useEffect(() => {
    // !WHY Need to run the function at least once to ensure the proper theme is applied at launch
    handleThemeChange(appearance);

    const handler = (e: MediaQueryListEvent) => {
      if (userAppearance === 'system') {
        handleThemeChange(e.matches ? 'dark' : 'light');
      }
    };
    const watchMedia = window.matchMedia('(prefers-color-scheme: dark)');

    // Watch for system theme changes
    watchMedia.addEventListener('change', handler);

    return () => {
      // Cleanup
      watchMedia.removeEventListener('change', handler);
    };
  }, [appearance]);
}
