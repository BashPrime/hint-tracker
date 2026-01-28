import { z } from 'zod';
import { GameSchema, TrackerConfigSchema } from '../shared/types.js';
import { WINDOW_SIZE } from './data.js';

export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function getDefaultWindowSize(game: string, isLegacyHints: boolean) {
  try {
    const parsedGame = GameSchema.parse(game);
    if (game === 'echoes') {
      return isLegacyHints ? WINDOW_SIZE.echoesLegacy : WINDOW_SIZE.echoes;
    }

    return WINDOW_SIZE[parsedGame];
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error('Error while parsing game:', err.issues);
    } else console.error(getErrorMsg(err));
  }

  return WINDOW_SIZE.default;
}

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
export function getErrorMsg(err: any) {
  if (err instanceof Error) {
    return err.message;
  }

  return String(err);
}

export function parseTrackerConfig(config: object) {
  try {
    return TrackerConfigSchema.parse(config);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error('parseTrackerConfig() - Cannot parse config object:', err.issues);
    } else console.error(getErrorMsg(err));
  }

  return null;
}
