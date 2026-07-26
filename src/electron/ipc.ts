import AdmZip from 'adm-zip';
import { dialog, ipcMain } from 'electron';
import {
  TrackerSaveState,
  TrackerSaveStateSchema,
  TrackerState,
} from '../shared/types/config.types.js';
import { loadTrackerState, saveTrackerState } from './config.js';
import { IPC_IDS, MENU_IDS, TRACKER_HOME_MENU_TEXT } from './constants.js';
import { getImage } from './images.js';
import { menu } from './menu.js';
import {
  buildTrackerAutosavePath,
  getAllPacksInDir,
  getBasicPack,
  getPackDetails,
} from './packs.js';
import { getErrorMsg, showDialog } from './util.js';
import { getMainWindow, resetWindowSize } from './window.js';

export function runIpcHandlers() {
  // get all basic packs data
  ipcMain.handle(IPC_IDS.fetchPacks, () => {
    return getAllPacksInDir();
  });

  // get pack details
  ipcMain.handle(IPC_IDS.fetchPackDetails, (_, packId: string) => {
    const packDetails = getPackDetails(packId);
    const resetPackSize = Boolean(
      packDetails &&
      menu.getMenuItemById(MENU_IDS.toggles.resetSizeOnPackOpen)?.checked
    );

    if (resetPackSize) {
      resetWindowSize(packId);
    }

    return packDetails;
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
      const state = loadTrackerState(buildTrackerAutosavePath(pack));

      if (!state.success) {
        console.error(
          'loadTrackerAutosave(): Tracker state failed validation',
          state.error
        );
        return null;
      }

      return state.data;
    }
  });

  ipcMain.handle(IPC_IDS.resetSizeResponse, (_, packId: string | null) => {
    resetWindowSize(packId);
  });

  ipcMain.handle(IPC_IDS.setTrackerMenuItems, (_, enabled: boolean) => {
    const trackerHomeMenuItem = menu.getMenuItemById(MENU_IDS.file.trackerHome);
    const exportMenuItem = menu.getMenuItemById(MENU_IDS.file.exportState);
    const resetTrackerMenuItem = menu.getMenuItemById(
      MENU_IDS.file.resetTracker
    );

    if (trackerHomeMenuItem) {
      trackerHomeMenuItem.label = enabled
        ? TRACKER_HOME_MENU_TEXT.returnToPackSelection
        : TRACKER_HOME_MENU_TEXT.refreshPacks;
    }

    if (exportMenuItem) {
      exportMenuItem.enabled = enabled;
    }

    if (resetTrackerMenuItem) {
      resetTrackerMenuItem.enabled = enabled;
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

  if (!mainWindow) {
    console.error('exportTrackerState(): main window not found');
    return;
  }

  mainWindow.webContents.send(IPC_IDS.exportTrackerState);

  ipcMain.handleOnce(
    IPC_IDS.exportTrackerStateResponse,
    (_, state: object, packId: string | null) => {
      const parsed = state as TrackerState;
      const pack = packId ? getBasicPack(packId) : null;

      // If no active pack is set, show error
      if (!pack) {
        const mainWindow = getMainWindow();
        if (mainWindow) {
          dialog.showMessageBox(mainWindow, {
            title: 'Export Error',
            message: `The application returned a nonexistent tracker pack with (pack ID: ${packId})`,
          });
        }
        console.error(
          'exportTrackerStateResponse(): Got a null pack from packId',
          packId
        );

        return;
      }

      // Do save as here
      dialog
        .showSaveDialog(mainWindow, {
          title: 'Save Tracker State',
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

export function importTrackerState() {
  const mainWindow = getMainWindow();

  if (!mainWindow) {
    return;
  }

  dialog
    .showOpenDialog(mainWindow, {
      title: 'Import Tracker State',
      filters: [{ name: 'Tracker State', extensions: ['json'] }],
      properties: ['openFile'],
    })
    .then((value) => {
      if (!value.canceled) {
        const state = loadTrackerState(value.filePaths[0]);

        if (!state.success) {
          showDialog({
            type: 'error',
            title: 'Import State Error',
            message: 'The tracker state is invalid and cannot be imported.',
          });
          console.error(
            'importTrackerState(): Tracker state is invalid:',
            state.error
          );
          return;
        }

        // Verify version before loading
        const pack = getBasicPack(state.data.pack.id);

        if (pack?.version !== state.data.pack.version) {
          dialog.showErrorBox(
            pack ? 'Version Mismatch' : 'Missing Pack',
            pack
              ? `The version of the tracker state (${state.data.pack.version}) does not match the version of the pack (${pack.version}). Aborting.`
              : 'Could not find the pack for this import. Is it installed?'
          );
          console.error(
            'importTrackerState(): version mismatch or missing pack:',
            state.data.pack.version,
            pack ? pack.version : null
          );
          return;
        }

        mainWindow.webContents.send(IPC_IDS.importTrackerState, state.data);
      }
    })
    .catch((err: any) => {
      dialog.showErrorBox(
        'Import Error',
        `Tracker state failed to import. ${getErrorMsg(err)}`
      );
      console.error(
        'importTrackerState(): Error loading tracker state:',
        getErrorMsg(err)
      );
    });
}
