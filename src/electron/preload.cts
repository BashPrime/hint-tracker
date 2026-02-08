import { ipcRenderer } from 'electron';

const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electronApi', {
  // renderer requests default presets, which main process sends
  requestPresets: () => ipcRenderer.invoke('request-presets'),
  presetsResponse: (callback: (presets: object[]) => void) =>
    ipcRenderer.on('presets-response', (_, presets: object[]) =>
      callback(presets)
    ),
  toggleAppearance: (callback: (appearance: string) => void) =>
    ipcRenderer.on('toggle-appearance', (_, appearance: string) =>
      callback(appearance)
    ),
  test: (val: string) => ipcRenderer.invoke('test', val),
  requestPresetsNew: () => ipcRenderer.invoke('request-presets-new'),
});
