import { ipcRenderer } from 'electron';

const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electronApi', {
  requestPresets: () => ipcRenderer.invoke('request-presets'),
});
