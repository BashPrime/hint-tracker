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
