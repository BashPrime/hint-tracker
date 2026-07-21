import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { DevTools } from 'jotai-devtools';
import css from 'jotai-devtools/styles.css?inline';

export function RouterDevTools() {
  return process.env.NODE_ENV !== 'production' ? (
    <TanStackRouterDevtools position="bottom-left" />
  ) : null;
}

export function JotaiDevTools() {
  return process.env.NODE_ENV !== 'production' ? (
    <>
      <style>{css}</style>
      <DevTools position="bottom-right" />
    </>
  ) : null;
}
