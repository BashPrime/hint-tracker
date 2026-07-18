import { useAutosaveTracker } from '@/hooks/useAutosaveTracker';
import { useResetSize } from '@/hooks/useResetSize';
import { useThemeChanger } from '@/hooks/useThemeChanger';
import { useTrackerHome } from '@/hooks/useTrackerHome';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { DevTools } from 'jotai-devtools';
import 'jotai-devtools/styles.css';
import css from 'jotai-devtools/styles.css?inline';
import './root.css';

function RouterDevTools() {
  return process.env.NODE_ENV !== 'production' ? (
    <TanStackRouterDevtools position="bottom-left" />
  ) : null;
}

function JotaiDevTools() {
  return process.env.NODE_ENV !== 'production' ? (
    <>
      <style>{css}</style>
      <DevTools position="bottom-right" />
    </>
  ) : null;
}

function RootLayout() {
  // !HOOKS
  useTrackerHome();
  useAutosaveTracker();
  useResetSize();
  useThemeChanger();

  return (
    <>
      <div className="h-full" data-name="_root">
        <Outlet />
      </div>
      <RouterDevTools />
      <JotaiDevTools />
    </>
  );
}

export const Route = createRootRoute({ component: RootLayout });
