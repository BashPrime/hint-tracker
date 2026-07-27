import { isDev } from '@/helpers/utils';
import { showDevtoolsState } from '@/states/App.states';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useAtomValue } from 'jotai';
import { DevTools } from 'jotai-devtools';
import css from 'jotai-devtools/styles.css?inline';

export function RouterDevTools() {
  const showDevtools = useAtomValue(showDevtoolsState);
  return isDev() && showDevtools ? (
    <TanStackRouterDevtools position="bottom-left" />
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
