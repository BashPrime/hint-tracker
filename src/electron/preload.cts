import { ipcRenderer } from 'electron';

const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electronApi', {
  requestGames: () => ipcRenderer.invoke('request-games'),
  requestCovers: () => ipcRenderer.invoke('request-covers'),
  requestPresets: () => ipcRenderer.invoke('request-presets'),
  requestPresetsForGame: (gameId: string) =>
    ipcRenderer.invoke('request-presets-for-game', gameId),
});
