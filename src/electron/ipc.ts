import AdmZip from 'adm-zip';
import { ipcMain } from 'electron';
import path from 'path';
import { saveTrackerState } from './config.js';
import { IPC_IDS, USER_TRACKER_SAVES_PATH } from './constants.js';
import { getImage } from './images.js';
import { getAllPacksInDir, getBasicPack, getPackDetails } from './packs.js';

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
        // ${userDataDir}/saves/{packId}/{packVersion}/autosave.json
        const autosavePackPath = path.join(
          USER_TRACKER_SAVES_PATH,
          pack.id,
          pack.version,
          'autosave.json'
        );

        saveTrackerState(state, autosavePackPath);
      }
    }
  );
}
