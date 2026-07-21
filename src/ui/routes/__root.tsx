import { useAutosaveTracker } from '@/hooks/useAutosaveTracker';
import { useImportExportTrackerState } from '@/hooks/useImportExportTrackerState';
import { useResetSize } from '@/hooks/useResetSize';
import { useThemeChanger } from '@/hooks/useThemeChanger';
import { useTrackerHome } from '@/hooks/useTrackerHome';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { JotaiDevTools, RouterDevTools } from './-components/dev-tools';
import './root.css';

// oxlint-disable-next-line react/only-export-components
function RootLayout() {
  // !HOOKS
  useTrackerHome();
  useAutosaveTracker();
  useImportExportTrackerState();
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
