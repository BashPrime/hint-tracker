import { useThemeChanger } from '@/hooks/useThemeChanger';
import { cn } from '@/lib/utils';
import { activeGameState, activeLayoutState } from '@/states/App.states';
import { createRootRoute, Outlet, useMatchRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useAtomValue } from 'jotai';
import { ChevronRight, Home } from 'lucide-react';
import { Breadcrumb } from './-components/breadcrumb';
import './root.css';

function RootLayout() {
  // !STATE
  const game = useAtomValue(activeGameState);
  const layout = useAtomValue(activeLayoutState);

  // !HOOKS
  useThemeChanger();
  const matchRoute = useMatchRoute();

  return (
    <>
      <nav
        className={cn('flex flex-none items-center gap-2', 'font-bold', 'p-2')}
      >
        <Breadcrumb to="/">
          <Home />
        </Breadcrumb>
        {game && !matchRoute({ to: '/' }) && (
          <>
            <ChevronRight size={16} />
            <Breadcrumb to="/games/$gameId" params={{ gameId: game.id }}>
              {game.name}
            </Breadcrumb>
          </>
        )}

        {layout && matchRoute({ to: '/layouts/$layoutId' }) && (
          <>
            <ChevronRight size={16} />
            <Breadcrumb
              to="/layouts/$layoutId"
              params={{ layoutId: layout.id }}
            >
              {layout.name}
            </Breadcrumb>
          </>
        )}
      </nav>
      <div className="flex-auto overflow-auto">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRoute({ component: RootLayout });
