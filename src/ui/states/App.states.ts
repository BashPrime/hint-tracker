import { Layout } from '@/types/layout.types';
import { GameDataOptionsTransformSchema } from '@/types/transform.types';
import { atom } from 'jotai';
import { Cover } from 'src/shared/types/cover.types';
import { Game } from 'src/shared/types/game.types';
import { Preset } from 'src/shared/types/preset.types';

export const presetsState = atom<Preset[] | null>(null);
export const activePresetState = atom<Preset | null>(null);

export const gamesState = atom<Game[] | null>(null);
export const activeGameState = atom<Game | null>(null);

export const activeGameDataOptionsSelector = atom((get) => {
  const game = get(activeGameState);

  if (game) {
    return GameDataOptionsTransformSchema.parse(game?.data);
  }

  return null;
});

export const coversState = atom<Cover[] | null>(null);

export const activeLayoutState = atom<Layout | null>(null);
