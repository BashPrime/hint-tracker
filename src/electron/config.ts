import path from 'path';
import { z } from 'zod';
import {
  ConfigSchema,
  ConfigType,
  WindowConfig,
  WindowConfigSchema,
} from '../shared/config.types.js';
import { PresetSchema } from '../shared/preset.types.js';
import {
  CONFIG_PATH,
  DEFAULT_PRESETS_PATH,
  PRESET_FILENAME_EXT,
  WINDOW_CONFIG_PATH,
} from './constants.js';
import { readDir, readJsonFile, writeJsonFile } from './io.js';
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

export function readWindowConfigFile(path: string = WINDOW_CONFIG_PATH) {
  return readAndParseJsonFile(path, WindowConfigSchema);
}

export function writeWindowConfigFile(
  config: WindowConfig,
  path: string = WINDOW_CONFIG_PATH
) {
  const json = JSON.stringify(config, null, 2);
  writeJsonFile(path, json);
}

export function getAllPresetsInDir(dir: string = DEFAULT_PRESETS_PATH) {
  const files = readDir(dir);

  if (!files) {
    return null;
  }

  return files
    .filter((file) => {
      return path.extname(file).toLowerCase() === PRESET_FILENAME_EXT;
    })
    .map((file) => {
      return readAndParseJsonFile(
        path.join(DEFAULT_PRESETS_PATH, file),
        PresetSchema
      );
    })
    .filter((preset) => preset !== null);
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
