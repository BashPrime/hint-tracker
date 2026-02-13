import { useThemeChanger } from '@/hooks/useThemeChanger';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import './root.css';

function RootLayout() {
  // !HOOKS
  useThemeChanger();

  return (
    <>
      <div className="flex-auto overflow-auto">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRoute({ component: RootLayout });
