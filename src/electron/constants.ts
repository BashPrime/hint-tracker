import { app } from 'electron';
import path from 'path';
import { isDev } from './util.js';

// Filename extensions
export const PRESET_FILENAME_EXT = '.preset';
export const TRACKER_FILE_EXT = '.track';

// Paths
export const USER_DATA_DIR = app.getPath('userData');
export const WINDOW_CONFIG_PATH = path.join(USER_DATA_DIR, 'window.json');
export const DEFAULT_PRESETS_PATH = path.join(
  app.getAppPath(),
  isDev() ? './src' : '..',
  'shared',
  'default-presets'
);
export const USER_PRESETS_PATH = path.join(USER_DATA_DIR, 'presets');

// IPC
export const IPC_IDS = {
  requestPresets: 'request-presets',
  presetsResponse: 'presets-response',
  toggleAppearance: 'toggle-appearance',
};

// Menu
export const MENU_IDS = {
  alwaysOnTop: 'alwaysOnTop',
  appearance: {
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
