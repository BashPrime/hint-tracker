import fs from 'fs';
import { z } from 'zod';
import { ConfigSchema, ConfigType } from '../shared/types/config.types.js';
import {
  CONFIG_PATH,
  USER_PACKS_PATH
} from './constants.js';
import { readJsonFile, writeJsonFile } from './io.js';
import { getErrorMsg } from './util.js';

export function readAndParseJsonFile<T extends z.ZodTypeAny>(
  path: string,
  schema: T
) {
  const raw = readJsonFile(path);

  if (raw) {
    try {
      const parsed = schema.parse(raw);
      return parsed;
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.error(
          'readAndParseJsonFile(): Error trying to read json file:',
          path,
          schema.type,
          err.issues
        );
      } else console.error(getErrorMsg(err));
    }
  }

  return null;
}

export function readConfigFile(path: string = CONFIG_PATH) {
  return readAndParseJsonFile(path, ConfigSchema);
}

export function writeConfigFile(
  config: ConfigType,
  path: string = CONFIG_PATH
) {
  const json = JSON.stringify(config, null, 2);
  writeJsonFile(path, json);
}

export function handleCreateUserDataDirs() {
  function handleMkDir(dir: string) {
    if (!fs.existsSync(dir)) {
      fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) {
          return console.error(err);
        }
      });
    }
  }

  handleMkDir(USER_PACKS_PATH);
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
