import { ipcMain } from 'electron';
import { IPC_IDS } from './constants.js';
import { getAllPacksInDir, getPackDetails } from './data.js';

export function runIpcHandlers() {
  // Handle packs request from renderer
  ipcMain.handle(IPC_IDS.fetchPacks, () => {
    return getAllPacksInDir();
  });
  ipcMain.handle(IPC_IDS.fetchPackDetails, (_, packId: string) => {
    return getPackDetails(packId);
  });
}
