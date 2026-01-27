import { app, dialog } from 'electron';
import path from 'path';
import fs from 'fs';
import { getMainWindow } from './window.js';
import {
  AppConfig,
  AppConfigSchema,
  Game,
  KeybearerRoomsSchema,
  PhazonSuitHintSchema,
  Toggles,
  TrackerConfig,
} from '../shared/types.js';
import { z } from 'zod';
import { menu } from './menu.js';
import { getErrorMsg, parseTrackerConfig } from './util.js';
import { MENU_IDS } from './data.js';
import { loadTrackerSession } from './ipc.js';

const TRACKER_CONFIG_PATH = path.join(app.getPath('userData'), 'tracker.json');
const APP_CONFIG_PATH = path.join(app.getPath('userData'), 'config.json');

let trackerState: TrackerConfig | null = null;

export function setGameMenuItem(game: Game) {
  const menuItem = menu.getMenuItemById(game);

  if (menuItem) {
    menuItem.checked = true;
  }
}

export function getTrackerState() {
  return trackerState;
}

export function setTrackerState(state: TrackerConfig | null) {
  if (state) {
    setGameMenuItem(state.game);
  }
  trackerState = state;
}

function readJsonFile(path: string) {
  try {
    const json = fs.readFileSync(path, 'utf-8');
    if (json) {
      return JSON.parse(json);
    }
  } catch (err) {
    console.error('Error reading json file:', path, getErrorMsg(err));
  }

  return null;
}

function writeJsonFile(path: string, json: string) {
  fs.writeFile(path, json, (err) => {
    if (err) {
      console.error('Error writing json file:', path, getErrorMsg(err));
    }
  });
}

export function readTrackerConfigFile(path: string = TRACKER_CONFIG_PATH) {
  return parseTrackerConfig(readJsonFile(path));
}

export function writeTrackerConfigFile(config: TrackerConfig, path: string = TRACKER_CONFIG_PATH) {
  const json = JSON.stringify(config, null, 2);
  writeJsonFile(path, json);
}

export function readAppConfigFile() {
  const raw = readJsonFile(APP_CONFIG_PATH);

  if (raw) {
    try {
      const parsed = AppConfigSchema.parse(raw);
      return parsed;
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.error('readAppConfigFile(): Error trying to read application config file:', err.issues);
      } else console.error(getErrorMsg(err));
    }
  }

  return null;
}

export function writeAppConfigFile(config: AppConfig) {
  const json = JSON.stringify(config, null, 2);
  writeJsonFile(APP_CONFIG_PATH, json);
}

function getTogglesState(): Toggles {
  function getKeybearerRoomsValue() {
    for (const value of KeybearerRoomsSchema.options) {
      if (menu.getMenuItemById(value)?.checked) {
        return value;
      }
    }

    return KeybearerRoomsSchema.enum.both;
  }

  function getPhazonSuitHintValue() {
    for (const value of PhazonSuitHintSchema.options) {
      if (menu.getMenuItemById(value)?.checked) {
        return value;
      }
    }

    return PhazonSuitHintSchema.enum.areaName;
  }

  return {
    alwaysOnTop: menu.getMenuItemById(MENU_IDS.alwaysOnTop)?.checked ?? false,
    legacyHintsEnabled: menu.getMenuItemById(MENU_IDS.legacyHintsEnabled)?.checked ?? false,
    keybearerRoomLabels: getKeybearerRoomsValue(),
    phazonSuitHint: getPhazonSuitHintValue(),
  };
}

export function getAppConfigState() {
  const mainWindow = getMainWindow();

  if (mainWindow) {
    try {
      return AppConfigSchema.parse({
        toggles: getTogglesState(),
        window: mainWindow.getBounds(),
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.error('getAppConfigState(): Error parsing app configuration:', err.issues);
      } else console.error(getErrorMsg(err));
    }
  }

  return null;
}

export function handleSaveAppConfig() {
  const config = getAppConfigState();

  if (config) {
    writeAppConfigFile(config);
  }
}

export function openUserProvidedTrackerFile() {
  const mainWindow = getMainWindow();
  if (mainWindow) {
    dialog
      .showOpenDialog(mainWindow, {
        title: 'Open Tracker File',
        filters: [{ name: 'JSON files', extensions: ['json'] }],
        properties: ['openFile'],
      })
      .then((value) => {
        if (!value.canceled) {
          const config = readTrackerConfigFile(value.filePaths[0]);
          if (!config) {
            dialog.showErrorBox('Cannot Parse Tracker File', 'This does not appear to be a valid tracker file.');
            throw new Error('openTrackerFile(): tracker config is null');
          }

          loadTrackerSession(config);
        }
      })
      .catch((err) => {
        console.error(getErrorMsg(err));
      });
  }
}

export function saveTrackerFileAs() {
  // async handle tracker state received from renderer
  const state = getTrackerState();

  if (state) {
    const mainWindow = getMainWindow();

    if (mainWindow) {
      dialog
        .showSaveDialog(mainWindow, {
          filters: [{ name: 'JSON files', extensions: ['json'] }],
          properties: ['showOverwriteConfirmation'],
        })
        .then((value) => {
          if (!value.canceled) {
            writeTrackerConfigFile(state, value.filePath);
          }
        })
        .catch((err) => {
          console.error(getErrorMsg(err));
        });
    }
  } else {
    dialog.showErrorBox('Cannot Save Tracker File', 'There is currently no tracker state to save.');
    console.error('saveTrackerFile(): there is no tracker state to save');
  }
}
