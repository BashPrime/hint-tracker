import { ipcRenderer } from 'electron';

const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electronApi', {
  fetchPacks: () => ipcRenderer.invoke('fetch-packs'),
  fetchPackDetails: (fileName: string) =>
    ipcRenderer.invoke('fetch-pack-details', fileName),
  fetchImage: (packId: string, imgPath: string) =>
    ipcRenderer.invoke('fetch-image', packId, imgPath),
  autosaveTrackerState: (state: object, packId: string) =>
    ipcRenderer.invoke('autosave-tracker-state', state, packId),
  loadTrackerAutosave: (packId: string) =>
    ipcRenderer.invoke('load-tracker-autosave', packId),
  resetTracker: (callback: () => void) => {
    const subscription = (_event: any) => callback();
    ipcRenderer.on('reset-tracker', subscription);

    return () => ipcRenderer.removeListener('reset-tracker', subscription);
  },
  resetSize: (callback: () => void) => {
    const subscription = (_event: any) => callback();
    ipcRenderer.on('reset-size', subscription);

    return () => ipcRenderer.removeListener('reset-size', subscription);
  },
  resetSizeResponse: (packId: string | null) =>
    ipcRenderer.invoke('reset-size-response', packId),
  trackerHome: (callback: () => void) => {
    const subscription = (_event: any) => callback();
    ipcRenderer.on('tracker-home', subscription);

    return () => ipcRenderer.removeListener('tracker-home', subscription);
  },
  setTrackerMenuItems: (enabled: boolean) =>
    ipcRenderer.invoke('set-tracker-menu-items', enabled),
  exportTrackerState: (callback: () => void) => {
    const subscription = (_event: any) => callback();
    ipcRenderer.on('export-tracker-state', subscription);

    return () =>
      ipcRenderer.removeListener('export-tracker-state', subscription);
  },
  importTrackerState: (callback: (state: object) => void) => {
    const subscription = (_event: any, state: object) => callback(state);
    ipcRenderer.on('import-tracker-state', subscription);

    return () =>
      ipcRenderer.removeListener('import-tracker-state', subscription);
  },
  exportTrackerStateResponse: (state: object, packId: string | null) =>
    ipcRenderer.invoke('export-tracker-state-response', state, packId),
});
