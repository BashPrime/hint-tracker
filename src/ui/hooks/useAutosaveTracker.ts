import { autosaveTrackerState } from '@/ipc';
import { activePackState, pauseAutosaveState, trackerSaveFormatted } from '@/states/App.states';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

export function useAutosaveTracker() {
  // !STATE
  const parsedTracker = useAtomValue(trackerSaveFormatted);
  const pack = useAtomValue(activePackState);
  const paused = useAtomValue(pauseAutosaveState);

  // !HOOK
  useEffect(() => {
    function saveTracker() {
      if (!paused && pack && parsedTracker) {
        autosaveTrackerState(parsedTracker, pack.id);
      }
    }

    saveTracker();
  }, [parsedTracker, paused]);
}
