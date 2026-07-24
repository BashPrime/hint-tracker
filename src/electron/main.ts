import { app } from 'electron';
import path from 'path';
import { handleCreateUserDataDirs, readConfigFile } from './config.js';
import { runIpcHandlers } from './ipc.js';
import { isDev, isWayland } from './util.js';
import { createMainWindow } from './window.js';

if (isWayland()) {
  app.setDesktopName('com.bashprime.hint-tracker');
}

app.on('ready', () => {
  app.setAboutPanelOptions({
    applicationName: 'BashPrime Hint Tracker',
    applicationVersion: `v${app.getVersion()}`,
    website: 'https://github.com/bashprime/prime-hint-tracker',
    copyright:
      `Copyright (c) ${new Date().getFullYear()} BashPrime` +
      '\n\nThis software is free for personal and commercial use under the MIT License.',
    iconPath: path.join(app.getAppPath(), 'assets/icon.png'),
  });
  const config = readConfigFile();
  const mainWindow = createMainWindow(config);

  if (isDev()) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
  }

  // if (config) {
  //   setToggles(config.toggles, mainWindow);
  // }
});

// Handle quit
app.on('window-all-closed', () => {
  app.quit();
});

// Handlers
runIpcHandlers();
handleCreateUserDataDirs();
