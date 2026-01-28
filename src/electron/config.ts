import { app } from 'electron';
import path from 'path';
import { z } from 'zod';
import { WindowConfig, WindowConfigSchema } from '../shared/config.types.js';
import { Game } from '../shared/types.js';
import { readDir, readJsonFile, writeJsonFile } from './io.js';
import { menu } from './menu.js';
import { getErrorMsg, isDev } from './util.js';

const USER_DATA_DIR = app.getPath('userData');
const WINDOW_CONFIG_PATH = path.join(USER_DATA_DIR, 'window.json');

export function setGameMenuItem(game: Game) {
  const menuItem = menu.getMenuItemById(game);

  if (menuItem) {
    menuItem.checked = true;
  }
}

export function readWindowConfigFile(path: string = WINDOW_CONFIG_PATH) {
  const raw = readJsonFile(path);

  if (raw) {
    try {
      const parsed = WindowConfigSchema.parse(raw);
      return parsed;
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.error('readWindowConfigFile(): Error trying to read window config file:', err.issues);
      } else console.error(getErrorMsg(err));
    }
  }

  return null;
}

export function writeWindowConfigFile(config: WindowConfig, path: string = WINDOW_CONFIG_PATH) {
  const json = JSON.stringify(config, null, 2);
  writeJsonFile(path, json);
}

export function getDefaultPresetFiles() {
  return readDir(path.join(app.getAppPath(), isDev() ? './src' : '..', 'shared/default-presets'));
}

// export function openUserProvidedTrackerFile() {
//   const mainWindow = getMainWindow();
//   if (mainWindow) {
//     dialog
//       .showOpenDialog(mainWindow, {
//         title: 'Open Tracker File',
//         filters: [{ name: 'JSON files', extensions: ['json'] }],
//         properties: ['openFile'],
//       })
//       .then((value) => {
//         if (!value.canceled) {
//           const config = readTrackerConfigFile(value.filePaths[0]);
//           if (!config) {
//             dialog.showErrorBox('Cannot Parse Tracker File', 'This does not appear to be a valid tracker file.');
//             throw new Error('openTrackerFile(): tracker config is null');
//           }

//           loadTrackerSession(config);
//         }
//       })
//       .catch((err) => {
//         console.error(getErrorMsg(err));
//       });
//   }
// }

// export function saveTrackerFileAs() {
//   // async handle tracker state received from renderer
//   const state = getTrackerState();

//   if (state) {
//     const mainWindow = getMainWindow();

//     if (mainWindow) {
//       dialog
//         .showSaveDialog(mainWindow, {
//           filters: [{ name: 'JSON files', extensions: ['json'] }],
//           properties: ['showOverwriteConfirmation'],
//         })
//         .then((value) => {
//           if (!value.canceled) {
//             writeTrackerConfigFile(state, value.filePath);
//           }
//         })
//         .catch((err) => {
//           console.error(getErrorMsg(err));
//         });
//     }
//   } else {
//     dialog.showErrorBox('Cannot Save Tracker File', 'There is currently no tracker state to save.');
//     console.error('saveTrackerFile(): there is no tracker state to save');
//   }
// }
