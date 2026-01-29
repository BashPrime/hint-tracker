import { ipcMain } from 'electron';
import { getAllPresetsInDir } from './config.js';
import { IPC_IDS, USER_PRESETS_PATH } from './constants.js';
import { getMainWindow } from './window.js';

export function runIpcHandlers() {
  // Receive request for default presets and respond with the presets data
  ipcMain.handle(IPC_IDS.requestPresets, () => {
    const presets = [
      ...getAllPresetsInDir() ?? [],
      ...getAllPresetsInDir(USER_PRESETS_PATH) ?? [],
    ]

    getMainWindow()?.webContents.send(IPC_IDS.presetsResponse, presets ?? []);
  });
}
