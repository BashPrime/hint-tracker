import AdmZip from 'adm-zip';
import { dialog, ipcMain } from 'electron';
import {
  TrackerSaveState,
  TrackerSaveStateSchema,
  TrackerState,
} from '../shared/types/config.types.js';
import { loadTrackerState, saveTrackerState } from './config.js';
import {
  DEFAULT_WINDOW_SIZE,
  IPC_IDS,
  MENU_IDS,
  WINDOW_RESIZE_OFFSETS,
} from './constants.js';
import { getImage } from './images.js';
import { menu } from './menu.js';
import {
  buildTrackerAutosavePath,
  getAllPacksInDir,
  getBasicPack,
  getPackDetails,
} from './packs.js';
import { getErrorMsg } from './util.js';
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
        try {
          const trackerState = TrackerSaveStateSchema.parse({
            pack: {
              id: pack.id,
              version: pack.version,
            },
            state,
          });
          saveTrackerState(trackerState, buildTrackerAutosavePath(pack));
        } catch (err) {
          console.error(
            'ipcMain.autosaveTrackerState() error:',
            getErrorMsg(err)
          );
        }
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

  ipcMain.handle(IPC_IDS.resetSizeResponse, (_, packId: string | null) => {
    const mainWindow = getMainWindow();
    const pack = packId ? getBasicPack(packId) : null;
    const packWindowSize =
      pack && pack.defaultWindowSize ? pack.defaultWindowSize : null;
    const size = packWindowSize
      ? {
          width: packWindowSize.width + WINDOW_RESIZE_OFFSETS.width,
          height: packWindowSize.height + WINDOW_RESIZE_OFFSETS.height,
        }
      : DEFAULT_WINDOW_SIZE;
    mainWindow?.setSize(size.width, size.height, true);
  });

  ipcMain.handle(IPC_IDS.setExportTrackerState, (_, enabled: boolean) => {
    const exportMenuItem = menu.getMenuItemById(MENU_IDS.file.exportState);
    if (exportMenuItem) {
      exportMenuItem.enabled = enabled;
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
        title: 'Confirm Reset',
        message:
          'This will reset the tracker and clear its autosave.\n\nDo you want to continue?',
        type: 'warning',
        buttons: ['Cancel', 'Yes'],
        cancelId,
      })
      .then((value) => {
        if (value.response !== cancelId) {
          mainWindow?.webContents.send(IPC_IDS.resetTracker);
        }
      });
  }
}

export function trackerHome() {
  const mainWindow = getMainWindow();
  mainWindow?.webContents.send(IPC_IDS.trackerHome);
}

export function resetSize() {
  const mainWindow = getMainWindow();
  mainWindow?.webContents.send(IPC_IDS.resetSize);
}

export function exportTrackerState() {
  const mainWindow = getMainWindow();

  if (mainWindow) {
    mainWindow.webContents.send(IPC_IDS.exportTrackerState);

    ipcMain.handleOnce(
      IPC_IDS.exportTrackerStateResponse,
      (_, state: object, packId: string | null) => {
        const parsed = state as TrackerState;
        const pack = packId ? getBasicPack(packId) : null;

        // If no active pack is set, show error
        if (!pack) {
          dialog.showErrorBox(
            'Export Error',
            `The application returned a nonexistent tracker pack with (pack ID: ${packId})`
          );
          console.error(
            'exportTrackerStateResponse(): Got a null pack from packId',
            packId
          );

          return;
        }

        // Do save as here
        dialog
          .showSaveDialog(mainWindow, {
            filters: [{ name: 'Tracker State', extensions: ['json'] }],
            properties: ['showOverwriteConfirmation'],
          })
          .then((value) => {
            if (!value.canceled) {
              saveTrackerState(
                {
                  pack: {
                    id: pack.id,
                    version: pack.version,
                  },
                  state: parsed,
                } satisfies TrackerSaveState,
                value.filePath
              );
            }
          })
          .catch((err) => {
            console.error(getErrorMsg(err));
          });
      }
    );
  }
}
