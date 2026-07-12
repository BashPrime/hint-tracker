import { ipcRenderer } from 'electron';

const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electronApi', {
  fetchPacks: () => ipcRenderer.invoke('fetch-packs'),
  fetchPackDetails: (fileName: string) => ipcRenderer.invoke('fetch-pack-details', fileName),
  fetchImage: (packId: string, imgPath: string) => ipcRenderer.invoke('fetch-image', packId, imgPath),
  autosaveTrackerState: (state: object, packId: string) => ipcRenderer.invoke('autosave-tracker-state', state, packId)
});
