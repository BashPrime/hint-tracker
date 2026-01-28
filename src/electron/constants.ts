import { app } from 'electron';
import path from 'path';
import { isDev } from './util.js';

// Filename extensions
export const PRESET_FILENAME_EXT = '.preset';
export const TRACKER_FILE_EXT = '.track';

// Paths
export const USER_DATA_DIR = app.getPath('userData');
export const WINDOW_CONFIG_PATH = path.join(USER_DATA_DIR, 'window.json');
export const DEFAULT_PRESETS_PATH = path.join(app.getAppPath(), isDev() ? './src' : '..', 'shared/default-presets');

// IPC
export const IPC_IDS = {
  requestDefaultPresets: 'request-default-presets',
  defaultPresetsResponse: 'default-presets-response',
  resetTracker: 'reset-tracker',
  setLegacyHintsEnabled: 'set-legacy-hints-enabled',
  resetSize: 'reset-size',
  loadTrackerSession: 'load-tracker-session',
  setKeybearerRooms: 'set-keybearer-rooms',
  setGame: 'set-game',
  setPhazonSuitHint: 'set-phazon-suit-hint',
};
