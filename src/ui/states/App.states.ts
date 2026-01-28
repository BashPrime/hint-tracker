import { atom } from 'jotai';
import { Preset } from 'src/shared/preset.types';

export const activePresetState = atom<Preset | null>(null);
