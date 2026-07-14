import AdmZip from 'adm-zip';
import { dialog, ipcMain } from 'electron';
import { loadTrackerState, saveTrackerState } from './config.js';
import { IPC_IDS } from './constants.js';
import { getImage } from './images.js';
import {
  buildTrackerAutosavePath,
  getAllPacksInDir,
  getBasicPack,
  getPackDetails,
} from './packs.js';
import { getMainWindow } from './window.js';

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

  // autosave tracker state
  ipcMain.handle(
    IPC_IDS.autosaveTrackerState,
    (_, state: object, packId: string) => {
      const pack = getBasicPack(packId);

      if (pack) {
        saveTrackerState(state, buildTrackerAutosavePath(pack));
      }
    }
  );

  // load tracker autosave state
  ipcMain.handle(IPC_IDS.loadTrackerAutosave, (_, packId: string) => {
    const pack = getBasicPack(packId);

    if (pack) {
      return loadTrackerState(buildTrackerAutosavePath(pack));
    }
  });
}

// these calls originate from ipcMain.
export function resetTracker() {
  const mainWindow = getMainWindow();
  const cancelId = 0;
  if (mainWindow) {
    dialog
      .showMessageBox(mainWindow, {
        title: "Confirm Reset",
        message:
          "This will reset the tracker and clear its autosave.\n\nDo you want to continue?",
        type: "warning",
        buttons: ["Cancel", "Yes"],
        cancelId,
      })
      .then((value) => {
        if (value.response !== cancelId) {
          mainWindow?.webContents.send(IPC_IDS.resetTracker);
        }
      });
  }
}