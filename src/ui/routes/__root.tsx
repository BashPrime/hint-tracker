import { useAutosaveTracker } from '@/hooks/useAutosaveTracker';
import { useThemeChanger } from '@/hooks/useThemeChanger';
import { cn } from '@/lib/utils';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { DevTools } from 'jotai-devtools';
import 'jotai-devtools/styles.css';
import css from 'jotai-devtools/styles.css?inline';
import { Home } from 'lucide-react';
import { Breadcrumb } from './-components/breadcrumb';
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
  useAutosaveTracker();
  useThemeChanger();

  return (
    <>
      <nav
        className={cn('flex flex-none items-center gap-2', 'font-bold', 'p-2')}
      >
        <Breadcrumb to="/">
          <Home size={20} />
        </Breadcrumb>
      </nav>
      <div className="flex-auto overflow-auto">
        <Outlet />
      </div>
      <RouterDevTools />
      <JotaiDevTools />
    </>
  );
}

export const Route = createRootRoute({ component: RootLayout });
