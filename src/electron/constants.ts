import { app } from 'electron';
import path from 'path';

export const BASE_PROJECT_URL = 'https://github.com/BashPrime/hint-tracker/';

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
  setTrackerMenuItems: 'set-tracker-menu-items',
  exportTrackerState: 'export-tracker-state',
  exportTrackerStateResponse: 'export-tracker-state-response',
  importTrackerState: 'import-tracker-state',
  installPack: 'install-pack',
  setAccessibleCheckboxes: 'set-accessible-checkboxes',
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
    resetSizeOnPackOpen: 'resetSizeOnPackOpen',
    accessibleCheckboxes: 'accessibleCheckboxes',
  },
  theme: {
    system: 'system',
    light: 'light',
    dark: 'dark',
  },
};

// Tracker Home Text
export const TRACKER_HOME_MENU_TEXT = {
  returnToPackSelection: 'Return to Pack Selection',
  refreshPacks: 'Refresh Packs',
};

// Window size
export const DEFAULT_WINDOW_SIZE = {
  width: 800,
  height: 600,
};

// Window state
export const DEFAULT_WINDOW_BOUNDS = {
  x: 0,
  y: 0,
  ...DEFAULT_WINDOW_SIZE,
};
