import { ipcRenderer } from 'electron';

const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electronApi', {
  requestPacks: () => ipcRenderer.invoke('request-packs'),
  requestGames: () => ipcRenderer.invoke('request-games'),
  requestCovers: () => ipcRenderer.invoke('request-covers'),
  requestPresets: () => ipcRenderer.invoke('request-presets'),
  createNewLayoutForGame: (gameId: string) =>
    ipcRenderer.invoke('create-new-layout-for-game', gameId),
  requestPresetsForGame: (gameId: string) =>
    ipcRenderer.invoke('request-presets-for-game', gameId),
});
