import {
  pauseAutosaveState,
  trackerHintsAtom,
  unhintedHintsState,
} from '@/states/App.states';
import { useAtomValue, useSetAtom, useStore } from 'jotai';
import { useEffect } from 'react';

export function useResetTracker() {
  // !STATE
  const hints = useAtomValue(trackerHintsAtom);
  const setUnhintedHints = useSetAtom(unhintedHintsState);
  const setPauseAutosave = useSetAtom(pauseAutosaveState);

  // !HOOK
  const store = useStore();

  useEffect(() => {
    // !IPC
    const cleanup = window.electronApi.resetTracker(() => {
      setPauseAutosave(true);
      if (hints) {
        for (const hint of hints) {
          if (hint.item) {
            store.set(hint.item, '');
          }
          if (hint.location) {
            store.set(hint.location, '');
          }
          store.set(hint.checked, false);
        }
      }
      setUnhintedHints([]);
      setPauseAutosave(false);
    });

    // Execute both cleanups when the component unmounts
    return () => {
      cleanup();
    };
  }, []);
}
