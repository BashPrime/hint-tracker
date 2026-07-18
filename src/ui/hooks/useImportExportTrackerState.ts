import {
  activePackState,
  trackerSaveFormattedState,
} from '@/states/App.states';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

export function useImportExportTrackerState() {
  // !STATE
  const pack = useAtomValue(activePackState);
  const trackerState = useAtomValue(trackerSaveFormattedState);

  useEffect(() => {
    // !IPC
    // Handle export state
    const cleanupExport = window.electronApi.exportTrackerState(() => {
      const packId = pack?.id ?? null;
      window.electronApi.exportTrackerStateResponse(trackerState, packId);
    });

    // Execute both cleanups when the component unmounts
    return () => {
      cleanupExport();
    };
  }, [trackerState]);
}
