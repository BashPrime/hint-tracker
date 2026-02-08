import { presetsState, userAppearanceState } from '@/states/App.states';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import z from 'zod';
import { AppearanceModeSchema } from '../../shared/base.types';
import { PresetSchema } from '../../shared/preset.types';

export function useIpcHandlers() {
  // !STATE
  const setPresets = useSetAtom(presetsState);
  const setUserAppearance = useSetAtom(userAppearanceState);

  // !HOOKS
  // On load, run these API functions
  useEffect(() => {
    const testVal = async () => {
      const data = await window.electronApi.test('testVal');
      console.log(data);
    };
    window.electronApi.requestPresets();
    testVal();
  }, []);

  // Handle communications from main process
  useEffect(() => {
    window.electronApi.presetsResponse((presets) => {
      try {
        const parsed = z.array(PresetSchema).parse(presets);
        setPresets(parsed);
      } catch (err) {
        if (err instanceof z.ZodError) {
          console.error(
            'presetsResponse(): Error trying to set default presets:',
            presets,
            err.issues
          );
        }
      }
    });

    window.electronApi.toggleAppearance((appearance) => {
      try {
        const parsed = AppearanceModeSchema.parse(appearance);
        setUserAppearance(parsed);
      } catch (err) {
        if (err instanceof z.ZodError) {
          console.error(
            'toggleAppearance(): Error trying to set appearance:',
            appearance,
            err.issues
          );
        }
      }
    });
  }, [setPresets, setUserAppearance]);
}
