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
      window.electronApi.exportTrackerStateResponse(
        trackerState,
        pack?.id ?? null
      );
    });

    // Execute both cleanups when the component unmounts
    return () => {
      cleanupExport();
    };
  }, [pack]);
}
