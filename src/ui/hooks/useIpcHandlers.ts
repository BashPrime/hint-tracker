import { defaultPresetsState } from '@/states/App.states';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import z from 'zod';
import { PresetSchema } from '../../shared/preset.types';

export function useIpcHandlers() {
  // !STATE
  const setDefaultPresets = useSetAtom(defaultPresetsState);

  // On load, run these API functions
  useEffect(() => {
    window.electronApi.requestDefaultPresets();
  }, []);

  // Handle communications from main process
  useEffect(() => {
    window.electronApi.defaultPresetsResponse((presets) => {
      try {
        const parsed = z.array(PresetSchema).parse(presets);
        setDefaultPresets(parsed);
      } catch (err) {
        if (err instanceof z.ZodError) {
          console.error('defaultPresetsResponse(): Error trying to set default presets:', presets, err.issues);
        }
      }
    });
  }, []);
}
