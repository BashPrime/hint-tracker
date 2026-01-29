import { activeHintLayoutState, activePresetState } from '@/states/App.states';
import { PresetToHintLayoutSchema } from '@/types/transform.types';
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
      const parsed = PresetToHintLayoutSchema.parse(activePreset);
      setActiveHintLayout(parsed);
    } else {
      setActiveHintLayout(null);
    }
  }, [activePreset]);
}
