import { ipcMain } from 'electron';
import { getDefaultPresets } from './config.js';
import { IPC_IDS } from './constants.js';
import { getMainWindow } from './window.js';
// import {
//   getAppConfigState,
//   getTrackerState,
//   readTrackerConfigFile,
//   setGameMenuItem,
//   setTrackerState,
// } from './config.js';

// export function requestRendererState(action: Action) {
//   const window = getMainWindow();
//   window?.webContents.send(IPC_IDS.requestRendererState, action);
// }

// export function loadTrackerSession(config: TrackerConfig | null) {
//   const mainWindow = getMainWindow();
//   // setTrackerState(config);

//   if (mainWindow) {
//     mainWindow.webContents.send(IPC_IDS.loadTrackerSession, config);
//   }
// }

// export function resetTracker() {
//   const mainWindow = getMainWindow();
//   const cancelId = 0;
//   if (mainWindow) {
//     dialog
//       .showMessageBox(mainWindow, {
//         title: 'Confirm Reset',
//         message: 'This will reset the tracker. ALL UNSAVED PROGRESS WILL BE LOST.\n\nDo you want to continue?',
//         type: 'warning',
//         buttons: ['Cancel', 'Yes'],
//         cancelId,
//       })
//       .then((value) => {
//         if (value.response !== cancelId) {
//           mainWindow?.webContents.send(IPC_IDS.resetTracker);
//         }
//       });
//   }
// }

// export function setLegacyHintsEnabled(enabled: boolean) {
//   const window = getMainWindow();
//   window?.webContents.send(IPC_IDS.setLegacyHintsEnabled, enabled);
// }

// export function setKeybearerRoomLabels(value: KeybearerRooms) {
//   const window = getMainWindow();
//   window?.webContents.send(IPC_IDS.setKeybearerRooms, value);
// }

// export function setGame(game: Game) {
//   const mainWindow = getMainWindow();
//   const cancelId = 0;

//   // const state = getTrackerState();

//   if (mainWindow && state?.game !== game) {
//     dialog
//       .showMessageBox(mainWindow, {
//         title: 'Confirm Game Switch',
//         message:
//           'Switching games will reset the tracker. ALL UNSAVED PROGRESS WILL BE LOST.\n\nDo you want to continue?',
//         type: 'warning',
//         buttons: ['Cancel', 'Yes'],
//         cancelId,
//       })
//       .then((value) => {
//         if (value.response !== cancelId) {
//           mainWindow?.webContents.send(IPC_IDS.setGame, game);

//           // If the window size is smaller than the game's default, reset the window size
//           const legacyHintsEnabled = menu.getMenuItemById(MENU_IDS.legacyHintsEnabled)?.checked;
//           const gameWindowSize = getDefaultWindowSize(game, legacyHintsEnabled ?? false);
//           const currentWindowSize = mainWindow.getSize();

//           if (currentWindowSize[0] < gameWindowSize.width && currentWindowSize[1] < gameWindowSize.height) {
//             mainWindow.setSize(gameWindowSize.width, gameWindowSize.height);
//           }
//         } else if (state) {
//           // Need to switch back to the previous radio button
//           setGameMenuItem(state.game);
//         }
//       });
//   }
// }

// export function setPhazonSuitHint(value: PhazonSuitHint) {
//   const window = getMainWindow();
//   window?.webContents.send(IPC_IDS.setPhazonSuitHint, value);
// }

// export function handleRendererInitialization() {
//   ipcMain.handle(IPC_IDS.requestMainState, () => {
//     const trackerConfig = readTrackerConfigFile();
//     const appConfig = getAppConfigState();

//     if (trackerConfig) {
//       setTrackerState(trackerConfig);
//     }

//     // Send tracker and toggle data to renderer
//     loadTrackerSession(trackerConfig);

//     if (appConfig) {
//       setLegacyHintsEnabled(appConfig.toggles.legacyHintsEnabled);
//       setKeybearerRoomLabels(appConfig.toggles.keybearerRoomLabels);
//       setPhazonSuitHint(appConfig.toggles.phazonSuitHint);
//     }
//   });
// }

// export function handleResetSize() {
//   ipcMain.handle(IPC_IDS.resetSize, (_, game: string, isLegacyHints: boolean) => {
//     const mainWindow = getMainWindow();
//     const windowSize = getDefaultWindowSize(game, isLegacyHints);
//     if (windowSize && mainWindow) {
//       mainWindow.setSize(windowSize.width, windowSize.height);
//     }
//   });
// }

// export function handleRendererTrackerStateUpdates() {
//   // handle receive from the renderer
//   ipcMain.handle(IPC_IDS.rendererTrackerState, (_, state: object) => {
//     const parsed = parseTrackerConfig(state);
//     setTrackerState(parsed);
//   });
// }

export function runIpcHandlers() {
  // Receive request for default presets and respond with the presets data
  ipcMain.handle(IPC_IDS.requestDefaultPresets, () => {
    const presets = getDefaultPresets();

    getMainWindow()?.webContents.send(IPC_IDS.defaultPresetsResponse, presets ?? []);
  });
}
