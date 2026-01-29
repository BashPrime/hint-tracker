import { ipcMain } from 'electron';
import { getDefaultPresets } from './config.js';
import { IPC_IDS } from './constants.js';
import { getMainWindow } from './window.js';

export function runIpcHandlers() {
  // Receive request for default presets and respond with the presets data
  ipcMain.handle(IPC_IDS.requestDefaultPresets, () => {
    const presets = getDefaultPresets();

    getMainWindow()?.webContents.send(IPC_IDS.defaultPresetsResponse, presets ?? []);
  });
}
