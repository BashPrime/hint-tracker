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
import { readAndParseJsonFile, readJsonFile, writeJsonFile } from './io.js';
import { getErrorMsg, showDialog } from './util.js';

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
      console.error(
        'saveTrackerState(): Error creating save directory:',
        getErrorMsg(err)
      );
      if (showErrorBox) {
        showDialog({
          type: 'error',
          title: 'Failed to Create Directory',
          message: getErrorMsg(err),
        });
      }

      return;
    } else {
      // Handle writing file
      const json = JSON.stringify(state, null, 2);
      fs.writeFile(path, json, (err) => {
        if (err) {
          console.error(
            'saveTrackerState(): Error writing json file:',
            path,
            getErrorMsg(err)
          );
          if (showErrorBox) {
            showDialog({
              type: 'error',
              title: 'Failed to Save Tracker State',
              message: `Failed to save ${path}: ${getErrorMsg(err)}`,
            });
          }
        }
      });
    }
  });
}

export function loadTrackerState(path: string) {
  const json = readJsonFile(path);
  return TrackerSaveStateSchema.safeParse(json);
}
