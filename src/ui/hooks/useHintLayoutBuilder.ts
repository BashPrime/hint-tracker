import { activeHintLayoutState, activePresetState } from '@/states/App.states';
import { HintLayoutSchema } from '@/types/hint-layout.types';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

export function useHintLayoutBuilder() {
  // !STATE
  const activePreset = useAtomValue(activePresetState);
  const setActiveHintLayout = useSetAtom(activeHintLayoutState);

  // !HOOKS
  // update hint layout atom when a new preset is picked
  useEffect(() => {
    if (activePreset) {
      const parsed = HintLayoutSchema.parse(activePreset);
      setActiveHintLayout(parsed);
    } else {
      setActiveHintLayout(null);
    }
  }, [activePreset]);
}
