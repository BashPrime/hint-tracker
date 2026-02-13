import { app } from 'electron';
import path from 'path';
import { isDev } from './util.js';

// Filename extensions
export const PRESET_FILENAME_EXT = '.preset';
export const TRACKER_FILE_EXT = '.track';

// Paths
export const DEFAULT_DATA_DIR = path.join(
  app.getAppPath(),
  isDev() ? './src' : '..',
  'shared',
  'data'
);
export const USER_DATA_DIR = app.getPath('userData');
export const CONFIG_PATH = path.join(USER_DATA_DIR, 'config.json');
export const DEFAULT_GAMES_PATH = path.join(DEFAULT_DATA_DIR, 'games');
export const DEFAULT_COVERS_PATH = path.join(DEFAULT_DATA_DIR, 'covers');
export const DEFAULT_PRESETS_PATH = path.join(DEFAULT_DATA_DIR, 'presets');
export const USER_PRESETS_PATH = path.join(USER_DATA_DIR, 'presets');

// IPC
export const IPC_IDS = {
  requestGames: 'request-games',
  requestPresets: 'request-presets',
  requestPresetsForGame: 'request-presets-for-game',
};

// Menu
export const MENU_IDS = {
  file: {
    openUserDataFolder: 'openUserDataFolder',
  },
  toggles: {
    alwaysOnTop: 'alwaysOnTop',
  },
  theme: {
    system: 'system',
    light: 'light',
    dark: 'dark',
  },
};

// Window size
export const DEFAULT_WINDOW_SIZE = {
  width: 640,
  height: 480,
};

// Window state
export const DEFAULT_WINDOW_BOUNDS = {
  x: 0,
  y: 0,
  ...DEFAULT_WINDOW_SIZE,
};
