import {
  pauseAutosaveState,
  trackerHintsAtom,
  unhintedHintsState,
} from '@/states/App.states';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

export function useResetTracker() {
  // !STATE
  const hints = useAtomValue(trackerHintsAtom);
  const setUnhintedHints = useSetAtom(unhintedHintsState);
  const setPauseAutosave = useSetAtom(pauseAutosaveState);

  const resettableHints = hints
    ? hints.map((hint) => ({
        ...hint,
        setItem: hint.item ? useSetAtom(hint.item) : null,
        setLocation: hint.location ? useSetAtom(hint.location) : null,
        setChecked: useSetAtom(hint.checked),
      }))
    : null;

  useEffect(() => {
    // !IPC
    const cleanup = window.electronApi.resetTracker(() => {
      setPauseAutosave(true);
      if (resettableHints) {
        for (const hint of resettableHints) {
          hint.setItem?.('');
          hint.setLocation?.('');
          hint.setChecked(false);
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
