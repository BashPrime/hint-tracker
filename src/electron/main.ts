import { app } from 'electron';
import path from 'path';
import { readWindowConfigFile } from './config.js';
import { runIpcHandlers } from './ipc.js';
import { isDev } from './util.js';
import { createMainWindow } from './window.js';

app.on('ready', () => {
  app.setAboutPanelOptions({
    applicationName: 'BashPrime Hint Tracker',
    applicationVersion: `v${app.getVersion()}`,
    website: 'https://github.com/bashprime/prime-hint-tracker',
    copyright:
      `Copyright (c) ${new Date().getFullYear()} BashPrime` +
      '\n\nThis software is free for personal and commercial use under the MIT License.',
    iconPath: './icon.png',
  });
  const windowConfig = readWindowConfigFile();
  // const config = readAppConfigFile();
  const mainWindow = createMainWindow(windowConfig);

  if (isDev()) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
  }

  // if (config) {
  //   setToggles(config.toggles, mainWindow);
  // }
});

// IPC Handlers
runIpcHandlers();
