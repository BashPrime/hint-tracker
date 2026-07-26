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
  const config = readConfigFile();
  const mainWindow = createMainWindow(config);

  if (isDev()) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(
      path.join(app.getAppPath(), 'dist-react', 'index.html')
    );
  }
});

// Handle quit
app.on('window-all-closed', () => {
  app.quit();
});

// Handlers
runIpcHandlers();
handleCreateUserDataDirs();
