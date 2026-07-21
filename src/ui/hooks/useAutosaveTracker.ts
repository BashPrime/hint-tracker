import { autosaveTrackerState } from '@/ipc';
import {
  activePackState,
  pauseAutosaveState,
  trackerSaveFormattedState,
} from '@/states/App.states';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

export function useAutosaveTracker() {
  // !STATE
  const trackerState = useAtomValue(trackerSaveFormattedState);
  const pack = useAtomValue(activePackState);
  const paused = useAtomValue(pauseAutosaveState);

  // !HOOK
  useEffect(() => {
    function saveTracker() {
      if (!paused && pack && trackerState) {
        autosaveTrackerState(trackerState, pack.id);
      }
    }

    saveTracker();
  }, [trackerState, paused, pack]);
}
