import { ipcMain } from 'electron';
import { getAllPresetsInDir } from './config.js';
import { IPC_IDS, USER_PRESETS_PATH } from './constants.js';
import { getMainWindow } from './window.js';

export function ipcToggleAppearance(appearance: 'system' | 'light' | 'dark') {
  getMainWindow()?.webContents.send(IPC_IDS.toggleAppearance, appearance);
}

export function runIpcHandlers() {
  // Responses
  // Receive request for default presets and respond with the presets data
  ipcMain.handle(IPC_IDS.requestPresets, () => {
    const defaultPresets = getAllPresetsInDir() ?? [];
    const userPresets = getAllPresetsInDir(USER_PRESETS_PATH) ?? [];
    const presets = [...defaultPresets, ...userPresets];

    getMainWindow()?.webContents.send(IPC_IDS.presetsResponse, presets ?? []);
  });
}
