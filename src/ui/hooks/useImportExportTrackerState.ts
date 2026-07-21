import {
  activePackState,
  importTrackerState,
  pauseAutosaveState,
  trackerSaveFormattedState,
  trackerStateToLoad,
} from '@/states/App.states';
import { useNavigate } from '@tanstack/react-router';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { TrackerSaveState } from 'src/shared/types/config.types';

export function useImportExportTrackerState() {
  // !STATE
  const pack = useAtomValue(activePackState);
  const trackerState = useAtomValue(trackerSaveFormattedState);
  const setStateToLoad = useSetAtom(trackerStateToLoad);
  const setPausedAutosave = useSetAtom(pauseAutosaveState);
  const setImportTrackerState = useSetAtom(importTrackerState);

  // !HOOK
  const navigate = useNavigate();

  useEffect(() => {
    // !IPC
    // Handle export state
    const cleanupExport = window.electronApi.exportTrackerState(() => {
      const packId = pack?.id ?? null;
      window.electronApi.exportTrackerStateResponse(trackerState, packId);
    });

    const cleanupImport = window.electronApi.importTrackerState(
      async (state) => {
        setPausedAutosave(true);

        // Prepare state for import
        const parsedState = state as TrackerSaveState;
        setStateToLoad('import');
        setImportTrackerState(parsedState);

        // force navigate back to home so existing pack route state clears
        await navigate({ to: '/' });

        // navigate to route, which will load the imported state
        navigate({
          to: '/packs/$packId',
          params: { packId: parsedState.pack.id },
        }).finally(() => {
          // cleanup
          setImportTrackerState(null);
          setStateToLoad('autosave');
          setPausedAutosave(false);
        });
      }
    );

    // Execute both cleanups when the component unmounts
    return () => {
      cleanupExport();
      cleanupImport();
    };
  }, [
    trackerState,
    navigate,
    setPausedAutosave,
    setStateToLoad,
    setImportTrackerState,
    pack,
  ]);
}
