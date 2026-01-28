import { atom } from 'jotai';
import { Preset } from 'src/shared/preset.types';

export const defaultPresetsState = atom<Preset[] | null>(null);
export const activePresetState = atom<Preset | null>(null);
