import { autosaveTrackerState } from '@/ipc';
import { activePackState, trackerSaveFormatted } from '@/states/App.states';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

export function useAutosaveTracker() {
  // !ATOMS
  const parsedTracker = useAtomValue(trackerSaveFormatted);
  const pack = useAtomValue(activePackState);

  // !HOOK
  useEffect(() => {
    function saveTracker() {
      if (pack && parsedTracker) {
        autosaveTrackerState(parsedTracker, pack.id);
      }
    }

    // autosave every minute
    saveTracker();
  }, []);
}
