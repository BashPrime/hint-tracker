import { dialog } from 'electron';
import fs from 'fs';
import { dirname } from 'path';
import {
  ConfigSchema,
  ConfigType,
  TrackerSaveState,
  TrackerSaveStateSchema,
} from '../shared/types/config.types.js';
import {
  CONFIG_PATH,
  USER_PACKS_PATH,
  USER_TRACKER_SAVES_PATH,
} from './constants.js';
import { readAndParseJsonFile, writeJsonFile } from './io.js';
import { getErrorMsg } from './util.js';

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
  handleMkDir(USER_TRACKER_SAVES_PATH);
}

export function saveTrackerState(
  state: TrackerSaveState,
  path: string,
  showErrorBox?: boolean
) {
  // Make sure directory exists first
  const dir = dirname(path);
  fs.mkdir(dir, { recursive: true }, (err) => {
    if (err) {
      if (showErrorBox) {
        dialog.showErrorBox('Failed to Create Directory', getErrorMsg(err));
      }
      return console.error(
        'saveTrackerState(): Error creating save directory:',
        getErrorMsg(err)
      );
    } else {
      // Handle writing file
      const json = JSON.stringify(state, null, 2);
      fs.writeFile(path, json, (err) => {
        if (err) {
          if (showErrorBox) {
            dialog.showErrorBox(
              'Failed to Save Tracker State',
              `Failed to save ${path}: ${getErrorMsg(err)}`
            );
          }
          console.error(
            'saveTrackerState(): Error writing json file:',
            path,
            getErrorMsg(err)
          );
        }
      });
    }
  });
}

export function loadTrackerState(path: string) {
  return readAndParseJsonFile(path, TrackerSaveStateSchema);
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
