import { app } from 'electron';
import path from 'path';
import { isDev } from './util.js';

// Filename extensions
export const PRESET_FILENAME_EXT = '.preset';
export const TRACKER_FILE_EXT = '.track';

// Paths
export const CONFIG_PATH = path.join(app.getPath('userData'), 'config.json');
export const DEFAULT_DATA_DIR = path.join(
  app.getAppPath(),
  isDev() ? './src' : '..',
  'shared',
  'data'
);
// User dirs
export const USER_DATA_DIR = path.join(app.getPath('userData'), 'data');
export const USER_PACKS_PATH = path.join(USER_DATA_DIR, 'packs');

// IPC
export const IPC_IDS = {
  fetchPacks: 'fetch-packs',
  fetchPackDetails: 'fetch-pack-details',
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
