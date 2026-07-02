import { ipcRenderer } from 'electron';

const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electronApi', {
  fetchPacks: () => ipcRenderer.invoke('fetch-packs'),
  fetchPackDetails: (fileName: string) => ipcRenderer.invoke('fetch-pack-details', fileName),
});
