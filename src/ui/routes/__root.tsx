import { useAutosaveTracker } from '@/hooks/useAutosaveTracker';
import { useImportExportTrackerState } from '@/hooks/useImportExportTrackerState';
import { useResetSize } from '@/hooks/useResetSize';
import { useThemeChanger } from '@/hooks/useThemeChanger';
import { useTrackerHome } from '@/hooks/useTrackerHome';
import { showDevtoolsState } from '@/states/App.states';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import ScrollSizeDevtools, {
  JotaiDevTools,
  RouterDevTools,
} from './-components/dev-tools';

// oxlint-disable-next-line react/only-export-components
function RootLayout() {
  // !STATE
  const [showDevtools, setShowDevtools] = useAtom(showDevtoolsState);

  // !HOOKS
  useTrackerHome();
  useAutosaveTracker();
  useImportExportTrackerState();
  useResetSize();
  useThemeChanger();

  useEffect(() => {
    function toggleDevtools(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === 'k') {
        setShowDevtools(!showDevtools);
      }
    }

    window.addEventListener('keydown', toggleDevtools);

    return () => {
      window.removeEventListener('keydown', toggleDevtools);
    };
  });

  // !FUNCTION

  return (
    <>
      <div className="h-full" data-name="_root">
        <Outlet />
      </div>
      <RouterDevTools />
      <JotaiDevTools />
      <ScrollSizeDevtools />
    </>
  );
}

export const Route = createRootRoute({ component: RootLayout });
