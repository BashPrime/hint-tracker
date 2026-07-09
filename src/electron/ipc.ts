import AdmZip from 'adm-zip';
import { ipcMain } from 'electron';
import { IPC_IDS } from './constants.js';
import { getImage } from './images.js';
import { getAllPacksInDir, getBasicPack, getPackDetails } from './packs.js';

export function runIpcHandlers() {
  // Handle packs request from renderer
  ipcMain.handle(IPC_IDS.fetchPacks, () => {
    return getAllPacksInDir();
  });

  // get pack details
  ipcMain.handle(IPC_IDS.fetchPackDetails, (_, packId: string) => {
    return getPackDetails(packId);
  });

  // get image
  ipcMain.handle(IPC_IDS.fetchImage, (_, packId: string, imgPath: string) => {
    const pack = getBasicPack(packId);

    if (pack) {
      const zip = new AdmZip(pack.path);
      return getImage(zip, imgPath);
    }

    return null;
  });
}
