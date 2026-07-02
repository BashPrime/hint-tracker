import { ipcMain } from 'electron';
import { v4 as uuidv4 } from 'uuid';
import { SCHEMA_VERSIONS } from '../shared/constants.js';
import { PresetSchema } from '../shared/types/preset.types.js';
import { IPC_IDS, USER_PRESETS_PATH } from './constants.js';
import {
  getAllCovers,
  getAllGames,
  getAllPacksInDir,
  getAllPresetsInDir,
  writeLayoutToFile,
} from './data.js';

export function runIpcHandlers() {
  // Handle packs request from renderer
  ipcMain.handle(IPC_IDS.requestPacks, () => {
    return getAllPacksInDir();
  });
  // Handle games request from renderer
  ipcMain.handle(IPC_IDS.requestGames, () => {
    return getAllGames();
  });
  // Get all game cover images
  ipcMain.handle(IPC_IDS.requestCovers, () => {
    return getAllCovers();
  });
  // Handle presets request from renderer
  ipcMain.handle(IPC_IDS.requestPresets, () => {
    const defaultPresets = getAllPresetsInDir() ?? [];
    const userPresets = getAllPresetsInDir(USER_PRESETS_PATH) ?? [];

    return [...defaultPresets, ...userPresets];
  });
  // Handle create layout request from renderer
  ipcMain.handle(IPC_IDS.createNewLayoutForGame, (_, gameId: string) => {
    const newLayout = PresetSchema.parse({
      schemaVersion: SCHEMA_VERSIONS.preset,
      id: uuidv4(),
      name: 'New Layout',
      description: '',
      gameId,
      layout: {
        numColumns: 1,
        columns: [],
      },
    });

    return writeLayoutToFile(newLayout);
  });
  // Get all presets for game
  ipcMain.handle(IPC_IDS.requestPresetsForGame, (_, gameId: string) => {
    const defaultPresets = getAllPresetsInDir() ?? [];
    const userPresets = getAllPresetsInDir(USER_PRESETS_PATH) ?? [];

    const presets = [...defaultPresets, ...userPresets];

    return presets.filter((preset) => preset.gameId === gameId);
  });
}
