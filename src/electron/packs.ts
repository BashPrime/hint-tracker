import AdmZip from 'adm-zip';
import { dialog } from 'electron';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path, { basename } from 'path';
import {
  BasicPack,
  BasicPackSchema,
  PackTrackerJsonSchema,
} from '../shared/types/pack.types.js';
import {
  IPC_IDS,
  TRACKER_AUTOSAVE_JSON,
  USER_PACKS_PATH,
  USER_TRACKER_SAVES_PATH,
} from './constants.js';
import { getImage } from './images.js';
import { readDir } from './io.js';
import { buildPackDetails } from './pack-builder.js';
import { getErrorMsg } from './util.js';
import { getMainWindow } from './window.js';

let packs: BasicPack[];

export function getAllPacksInDir(dir: string = USER_PACKS_PATH): BasicPack[] {
  const files = readDir(dir);

  if (!files) {
    return [];
  }

  packs = files
    .filter((file) => {
      return path.extname(file).toLowerCase() === '.zip';
    })
    .map((file) => getPackTrackerJson(path.join(dir, file)))
    .filter((pack) => pack !== null);

  return packs;
}

export function getBasicPack(packId: string) {
  if (!packs) {
    getAllPacksInDir();
  }

  return packs.find((pack) => pack.id === packId);
}

export function getPackTrackerJson(filePath: string): BasicPack | null {
  const zip = new AdmZip(filePath);

  const trackerJsonRaw = zip.readAsText('tracker.json');

  if (!trackerJsonRaw) {
    return null;
  }

  const parsedJson = PackTrackerJsonSchema.safeParse(
    JSON.parse(trackerJsonRaw)
  );

  if (!parsedJson.success) {
    return null;
  }

  const parsed = BasicPackSchema.safeParse({
    ...parsedJson.data,
    path: filePath,
    cover: parsedJson.data.cover ? getImage(zip, parsedJson.data.cover) : null,
  });

  if (!parsed.success) {
    console.error('getPackTrackerJson(): tracker.json failed validation:', parsed.error)
    return null;
  }

  return parsed.data;
}

export function getPackDetails(packId: string) {
  if (!packs) {
    getAllPacksInDir();
  }

  const match = packs.find((p) => p.id === packId);

  if (!match) {
    return null;
  }

  return buildPackDetails(match);
}

export function buildTrackerAutosavePath(pack: BasicPack) {
  // ${userDataDir}/saves/{packId}/{packVersion}/autosave.json
  return path.join(
    USER_TRACKER_SAVES_PATH,
    pack.id,
    pack.version,
    TRACKER_AUTOSAVE_JSON
  );
}

export function installPack(srcFilePath: string) {
  const mainWindow = getMainWindow();
  const packFileName = basename(srcFilePath);
  const destination = path.join(USER_PACKS_PATH, packFileName);
  const confirmOverwriteCancelId = 0;

  if (!mainWindow) {
    return;
  }

  // Confirm if the pack file already exists
  if (fs.existsSync(destination)) {
    const confirmButtonId = dialog.showMessageBoxSync(mainWindow, {
      title: 'Pack Exists',
      message: 'A pack with this file name exists. Overwrite?',
      type: 'warning',
      buttons: ['No, cancel', 'Yes, overwrite'],
      cancelId: confirmOverwriteCancelId,
    });

    // If the user cancels, just return immediately/abort
    if (confirmButtonId === confirmOverwriteCancelId) {
      return;
    }
  }

  fsPromises
    .cp(srcFilePath, destination)
    .then(() => {
      dialog.showMessageBox(mainWindow, {
        title: 'Success',
        message: `${packFileName} installed successfully.`,
        type: 'info',
        buttons: ['OK'],
      });

      // Show tracker home after install
      mainWindow?.webContents.send(IPC_IDS.trackerHome);
    })
    .catch((err: any) => {
      dialog.showErrorBox(
        'Error Installing',
        `An error occurred installing ${packFileName}: ${getErrorMsg(err)}`
      );
      console.error(
        `An error occurred installing ${packFileName}: ${getErrorMsg(err)}`
      );
    });
}

export function installPackDialog() {
  const mainWindow = getMainWindow();

  if (!mainWindow) {
    return;
  }

  dialog
    .showOpenDialog(mainWindow, {
      title: 'Install Pack',
      filters: [{ name: 'Tracker Packs', extensions: ['zip'] }],
      properties: ['openFile'],
    })
    .then((value) => {
      if (!value.canceled) {
        const filePath = value.filePaths[0];
        const packFileName = basename(filePath);
        const packTrackerJson = getPackTrackerJson(filePath);

        if (!packTrackerJson) {
          dialog.showErrorBox(
            'Invalid Pack',
            `${packFileName} is invalid and cannot be installed.`
          );
          console.error('installPackDialog(): packTrackerJson is null');
          return;
        }

        // Pack seems valid, install in packs dir
        installPack(filePath);
      }
    })
    .catch((err: any) => {
      dialog.showErrorBox('Error', getErrorMsg(err));
    });
}
