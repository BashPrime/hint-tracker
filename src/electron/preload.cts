import { ipcRenderer } from 'electron';

const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electronApi', {
  // renderer requests default presets, which main process sends
  requestPresets: () => ipcRenderer.invoke('request-presets'),
  presetsResponse: (callback: (presets: object[]) => void) =>
    ipcRenderer.on('presets-response', (_, presets: object[]) => callback(presets)),
  // onResetTracker: (callback: () => void) => ipcRenderer.on('reset-tracker', () => callback()),
  // setLegacyHintsEnabled: (callback: (checked: boolean) => void) =>
  //   ipcRenderer.on('set-legacy-hints-enabled', (_, checked: boolean) => callback(checked)),
  // onRequestRendererState: (callback: (action: string) => void) =>
  //   ipcRenderer.on('request-renderer-state', (_, action: string) => callback(action)),
  // rendererTrackerState: (state: object) => ipcRenderer.invoke('renderer-tracker-state', state),
  // resetSize: (game: string, isLegacyHints: boolean) => ipcRenderer.invoke('reset-size', game, isLegacyHints),
  // requestMainState: () => ipcRenderer.invoke('request-main-state'),
  // loadTrackerSession: (callback: (config: object, legacyHintsEnabled: boolean) => void) =>
  //   ipcRenderer.on('load-tracker-session', (_, config: object, legacyHintsEnabled: boolean) =>
  //     callback(config, legacyHintsEnabled)
  //   ),
  // setKeybearerRooms: (callback: (value: string) => void) =>
  //   ipcRenderer.on('set-keybearer-rooms', (_, value: string) => callback(value)),
  // setGame: (callback: (game: string) => void) => ipcRenderer.on('set-game', (_, game: string) => callback(game)),
  // setPhazonSuitHint: (callback: (value: string) => void) =>
  //   ipcRenderer.on('set-phazon-suit-hint', (_, value: string) => callback(value)),
});
