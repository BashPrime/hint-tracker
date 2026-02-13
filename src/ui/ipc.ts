import { getDefaultStore } from 'jotai';
import { CoverSchema } from 'src/shared/types/cover.types';
import { GameSchema } from 'src/shared/types/game.types';
import { PresetSchema } from 'src/shared/types/preset.types';
import z from 'zod';
import { coversState, gamesState, presetsState } from './states/App.states';

export async function fetchGames() {
  const data = await window.electronApi.requestGames();
  try {
    const parsed = z.array(GameSchema).parse(data);
    getDefaultStore().set(gamesState, parsed);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error('fetchGames(): Error parsing data', data, err.issues);
    }
  }
}

export async function fetchCovers() {
  const data = await window.electronApi.requestCovers();
  try {
    const parsed = z.array(CoverSchema).parse(data);
    getDefaultStore().set(coversState, parsed);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error('fetchCovers(): Error parsing data', data, err.issues);
    }
  }
}

export async function fetchPresets() {
  const data = await window.electronApi.requestPresets();
  try {
    const parsed = z.array(PresetSchema).parse(data);
    getDefaultStore().set(presetsState, parsed);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error('fetchPresets(): Error parsing data', data, err.issues);
    }
  }
}

export async function fetchPresetsForGame(gameId: string) {
  const data = await window.electronApi.requestPresetsForGame(gameId);
  try {
    const parsed = z.array(PresetSchema).parse(data);
    getDefaultStore().set(presetsState, parsed);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error(
        'fetchPresetsForGame(): Error parsing data',
        data,
        err.issues
      );
    }
  }
}
