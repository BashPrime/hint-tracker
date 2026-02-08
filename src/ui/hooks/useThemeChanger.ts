import { useEffect } from 'react';

export function useThemeChanger() {
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
    const handler = (e: MediaQueryListEvent) => {
      handleThemeChange(e.matches ? 'dark' : 'light');
    };
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    handleThemeChange(matchMedia.matches ? 'dark' : 'light');

    // Watch for system theme changes
    matchMedia.addEventListener('change', handler);

    return () => {
      // Cleanup
      matchMedia.removeEventListener('change', handler);
    };
  }, []);
}
