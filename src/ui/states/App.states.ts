import { Layout } from '@/types/layout.types';
import { atom } from 'jotai';
import { Game } from 'src/shared/types/game.types';
import { Preset } from 'src/shared/types/preset.types';

export const presetsState = atom<Preset[] | null>(null);
export const activePresetState = atom<Preset | null>(null);

export const gamesState = atom<Game[] | null>(null);
export const activeGameState = atom<Game | null>(null);

export const activeLayoutState = atom<Layout | null>(null);
