import AdmZip from 'adm-zip';
import { ipcMain } from 'electron';
import { saveTrackerState } from './config.js';
import { IPC_IDS } from './constants.js';
import { getImage } from './images.js';
import {
  buildTrackerAutosavePath,
  getAllPacksInDir,
  getBasicPack,
  getPackDetails,
} from './packs.js';

export function runIpcHandlers() {
  // get all basic packs data
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

  // save tracker state
  ipcMain.handle(
    IPC_IDS.autosaveTrackerState,
    (_, state: object, packId: string) => {
      const pack = getBasicPack(packId);

      if (pack) {
        saveTrackerState(state, buildTrackerAutosavePath(pack));
      }
    }
  );
}
