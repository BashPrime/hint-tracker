import { useThemeChanger } from '@/hooks/useThemeChanger';
import { activeGameState, activeLayoutState } from '@/states/App.states';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useAtomValue } from 'jotai';
import { ChevronRight, Home } from 'lucide-react';
import './root.css';

function RootLayout() {
  // !STATE
  const game = useAtomValue(activeGameState);
  const layout = useAtomValue(activeLayoutState);

  // !HOOKS
  useThemeChanger();

  return (
    <>
      <nav className="flex flex-none items-center gap-2 font-bold">
        <Link to="/">
          <Home />
        </Link>
        {game && (
          <>
            <ChevronRight />
            <Link
              to="/games/$gameId"
              params={{ gameId: game.id }}
              className="hover:text-blue-400"
            >
              {game.name}
            </Link>
          </>
        )}
        {layout && (
          <>
            <ChevronRight />
            <Link
              to="/layouts/$layoutId"
              params={{ layoutId: layout.id }}
              className="hover:text-blue-400"
            >
              {layout.name}
            </Link>
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
