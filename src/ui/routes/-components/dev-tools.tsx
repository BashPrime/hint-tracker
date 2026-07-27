import { cn } from '@/lib/utils';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { DevTools } from 'jotai-devtools';
import css from 'jotai-devtools/styles.css?inline';
import { useEffect, useState } from 'react';

export function RouterDevTools() {
  return (
    <TanStackRouterDevtools
      position="bottom-left"
      panelProps={{
        className: 'z-[9999]',
      }}
    />
  );
}

export function JotaiDevTools() {
  return (
    <>
      <style>{css}</style>
      <DevTools position="bottom-right" />
    </>
  );
}

export default function ScrollSizeDevtools() {
  // !STATE
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
