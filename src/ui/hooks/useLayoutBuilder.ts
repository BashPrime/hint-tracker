import { activeHintLayoutState, activePresetState } from '@/states/App.states';
import { PresetToLayoutTransformSchema } from '@/types/transform.types';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

export function useLayoutBuilder() {
  // !STATE
  const activePreset = useAtomValue(activePresetState);
  const setActiveHintLayout = useSetAtom(activeHintLayoutState);

  // !HOOKS
  // update hint layout atom when a new preset is picked
  useEffect(() => {
    if (activePreset) {
      const parsed = PresetToLayoutTransformSchema.parse(activePreset);
      setActiveHintLayout(parsed);
    } else {
      setActiveHintLayout(null);
    }
  }, [activePreset]);
}
