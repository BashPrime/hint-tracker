import { app } from 'electron';
import path from 'path';

// Paths
export const CONFIG_PATH = path.join(app.getPath('userData'), 'config.json');

// User dirs
export const USER_DATA_DIR = path.join(app.getPath('userData'), 'data');
export const USER_PACKS_PATH = path.join(USER_DATA_DIR, 'packs');
export const USER_TRACKER_SAVES_PATH = path.join(USER_DATA_DIR, 'saves');

// IPC
export const IPC_IDS = {
  fetchPacks: 'fetch-packs',
  fetchPackDetails: 'fetch-pack-details',
  fetchImage: 'fetch-image',
  autosaveTrackerState: 'autosave-tracker-state',
  loadTrackerAutosave: 'load-tracker-autosave',
  resetTracker: 'reset-tracker',
  resetSize: 'reset-size',
  resetSizeResponse: 'reset-size-response',
  trackerHome: 'tracker-home',
  setExportTrackerState: 'set-export-tracker-state',
  exportTrackerState: 'export-tracker-state',
  exportTrackerStateResponse: 'export-tracker-state-response',
  importTrackerState: 'import-tracker-state',
  importTrackerStateResponse: 'import-tracker-state-response',
};

// Tracker
export const TRACKER_AUTOSAVE_JSON = 'autosave.json';

// Menu
export const MENU_IDS = {
  file: {
    trackerHome: 'trackerHome',
    installPack: 'installPack',
    openUserDataFolder: 'openUserDataFolder',
    resetSize: 'resetSize',
    resetTracker: 'resetTracker',
    importState: 'importState',
    exportState: 'exportState',
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

// !WHY the window size counts the menubar, so these offsets are added to ensure the values are correct.
export const WINDOW_RESIZE_OFFSETS = {
  width: 13,
  height: 62,
};
