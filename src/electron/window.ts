import { BrowserWindow, Menu } from 'electron';
import z from 'zod';
import { WindowConfig, WindowConfigSchema } from '../shared/config.types.js';
import { writeWindowConfigFile } from './config.js';
import { DEFAULT_WINDOW_SIZE } from './constants.js';
import { menu } from './menu.js';
import { getPreloadPath } from './pathResolver.js';
import { getErrorMsg, isDev } from './util.js';

let mainWindow: BrowserWindow | null = null;

export function createMainWindow(windowConfig: WindowConfig | null) {
  mainWindow = new BrowserWindow({
    title: 'BashPrime Hint Tracker',
    width: windowConfig?.width ?? DEFAULT_WINDOW_SIZE.width,
    height: windowConfig?.height ?? DEFAULT_WINDOW_SIZE.height,
    x: windowConfig?.x ?? undefined,
    y: windowConfig?.y ?? undefined,
    minWidth: 640,
    minHeight: 480,
    webPreferences: {
      devTools: isDev(),
      preload: getPreloadPath(),
    },
  });

  Menu.setApplicationMenu(menu);
  mainWindowHandlers(mainWindow);

  return mainWindow;
}

export function getMainWindow() {
  return mainWindow;
}

export function clearMainWindow() {
  mainWindow = null;
  return mainWindow;
}

export function closeMainWindow() {
  mainWindow?.close();
}

function getWindowState() {
  const state = mainWindow?.getBounds();

  try {
    return WindowConfigSchema.parse(state);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error('getWindowState(): Error when parsing:', err.issues);
    } else console.error(getErrorMsg(err));
  }
}

function handleSaveWindowConfig() {
  const windowState = getWindowState();

  if (windowState) {
    writeWindowConfigFile(windowState);
  }
}

function mainWindowHandlers(window: BrowserWindow) {
  // window.on('resized', () => {
  //   handleSaveWindowConfig();
  // });

  // window.on('moved', () => {
  //   handleSaveWindowConfig();
  // });

  window.on('close', (event) => {
    handleSaveWindowConfig();
  });
}
