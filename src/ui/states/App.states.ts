import { HintLayout } from '@/types/hint-layout.types';
import { atom } from 'jotai';
import { Preset } from 'src/shared/preset.types';

export const presetsState = atom<Preset[] | null>(null);
export const activePresetState = atom<Preset | null>(null);

export const activeHintLayoutState = atom<HintLayout | null>(null);
