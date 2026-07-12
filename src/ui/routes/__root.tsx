import { useAutosaveTracker } from '@/hooks/useAutosaveTracker';
import { useThemeChanger } from '@/hooks/useThemeChanger';
import { cn } from '@/lib/utils';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Home } from 'lucide-react';
import { Breadcrumb } from './-components/breadcrumb';
import './root.css';

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
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRoute({ component: RootLayout });
