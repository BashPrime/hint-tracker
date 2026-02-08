import { presetsState } from '@/states/App.states';
import { PresetToLayoutTransformSchema } from '@/types/transform.types';
import { useAtomValue } from 'jotai';

export function useLayout(id: string) {
  const presets = useAtomValue(presetsState);
  const presetMatch = presets?.find((preset) => preset.id === id);

  if (presetMatch) {
    const parsed = PresetToLayoutTransformSchema.safeParse(presetMatch);
    return parsed.success ? parsed.data.layout : null;
  }

  return null;
}
