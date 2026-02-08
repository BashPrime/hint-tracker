import { Layout } from '@/types/layout.types';
import { atom } from 'jotai';
import { Preset } from 'src/shared/preset.types';

export const presetsState = atom<Preset[] | null>(null);
export const activePresetState = atom<Preset | null>(null);

export const activeLayoutState = atom<Layout | null>(null);
