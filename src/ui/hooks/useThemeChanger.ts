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
    handleThemeChange(appearance);
  }, [appearance]);

  // Watch for system theme changes
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (event) => {
      if (userAppearance === 'system') {
        handleThemeChange(event.matches ? 'dark' : 'light');
      }
    });
}
