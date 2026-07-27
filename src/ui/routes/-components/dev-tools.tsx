import { isDev } from '@/helpers/utils';
import { cn } from '@/lib/utils';
import { showDevtoolsState } from '@/states/App.states';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useAtomValue } from 'jotai';
import { DevTools } from 'jotai-devtools';
import css from 'jotai-devtools/styles.css?inline';
import { useEffect, useState } from 'react';

export function RouterDevTools() {
  const showDevtools = useAtomValue(showDevtoolsState);
  return isDev() && showDevtools ? (
    <TanStackRouterDevtools
      position="bottom-left"
      panelProps={{
        className: 'z-[9999]',
      }}
    />
  ) : null;
}

export function JotaiDevTools() {
  const showDevtools = useAtomValue(showDevtoolsState);
  return isDev() && showDevtools ? (
    <>
      <style>{css}</style>
      <DevTools position="bottom-right" />
    </>
  ) : null;
}

export default function ScrollSizeDevtools() {
  // !STATE
  const showDevtools = useAtomValue(showDevtoolsState);
  const [scrollSize, setScrollSize] = useState({
    width: 0,
    height: 0,
  });

  // !HOOK
  useEffect(() => {
    function updateSize() {
      const width = document.documentElement.scrollWidth;
      const height = document.documentElement.scrollHeight;
      setScrollSize({ width, height });
    }

    updateSize();

    window.addEventListener('resize', updateSize);
    window.addEventListener('scroll', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('scroll', updateSize);
    };
  }, []);

  if (!showDevtools) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed! z-[999] inline',
        'bottom-12 left-2.5',
        'rounded bg-zinc-900 px-3 py-2',
        'text-md font-mono text-white'
      )}
    >
      <p>Scroll Width x Height:</p>
      <p>
        {scrollSize.width} x {scrollSize.height} px
      </p>
    </div>
  );
}
