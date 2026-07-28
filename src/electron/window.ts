import { BrowserWindow, Menu, nativeTheme } from 'electron';
import z from 'zod';
import { ThemeType } from '../shared/types/base.types.js';
import { ConfigSchema, ConfigType } from '../shared/types/config.types.js';
import { writeConfigFile } from './config.js';
import {
  DEFAULT_WINDOW_BOUNDS,
  DEFAULT_WINDOW_SIZE,
  MENU_IDS,
} from './constants.js';
import { menu } from './menu.js';
import { getBasicPack } from './packs.js';
import { getIconPath, getPreloadPath } from './pathResolver.js';
import { getErrorMsg, isDev } from './util.js';

let mainWindow: BrowserWindow | null = null;

export function createMainWindow(config: ConfigType | null) {
  mainWindow = new BrowserWindow({
    title: 'BashPrime Hint Tracker',
    width: config?.window.width ?? DEFAULT_WINDOW_SIZE.width,
    height: config?.window.height ?? DEFAULT_WINDOW_SIZE.height,
    x: config?.window.x ?? undefined,
    y: config?.window.y ?? undefined,
    minWidth: 240,
    minHeight: 240,
    webPreferences: {
      devTools: isDev(),
      preload: getPreloadPath(),
    },
    icon: getIconPath(),
  });

  if (config) {
    setInitialTheme(config.theme);
    setInitialResetPackSize(config.resetSizeOnPackOpen);
    setInitialAlwaysOnTop(config.alwaysOnTop);
    setInitialAccessibleCheckboxes(config.accessibleCheckboxes);
  }

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

function setInitialAlwaysOnTop(checked: boolean) {
  const mainWindow = getMainWindow();
  const alwaysOnTop = menu.getMenuItemById(MENU_IDS.toggles.alwaysOnTop);

  if (alwaysOnTop) {
    mainWindow?.setAlwaysOnTop(checked);
    alwaysOnTop.checked = checked;
  }
}

function setInitialTheme(theme: ThemeType) {
  nativeTheme.themeSource = theme;
  const menuThemeRadioItem = menu.getMenuItemById(MENU_IDS.theme[theme]);
  if (menuThemeRadioItem) {
    menuThemeRadioItem.checked = true;
  }
}

function setInitialResetPackSize(checked: boolean) {
  const resetPackSize = menu.getMenuItemById(
    MENU_IDS.toggles.resetSizeOnPackOpen
  );

  if (resetPackSize) {
    resetPackSize.checked = checked;
  }
}

function setInitialAccessibleCheckboxes(checked: boolean) {
  const accessibleCheckboxes = menu.getMenuItemById(
    MENU_IDS.toggles.accessibleCheckboxes
  );

  if (accessibleCheckboxes) {
    accessibleCheckboxes.checked = checked;
  }
}

function handleSaveConfig() {
  try {
    const parsed = ConfigSchema.parse({
      theme: nativeTheme.themeSource,
      window: mainWindow?.getBounds() ?? DEFAULT_WINDOW_BOUNDS,
      alwaysOnTop: mainWindow?.isAlwaysOnTop() ?? false,
      resetSizeOnPackOpen:
        menu.getMenuItemById(MENU_IDS.toggles.resetSizeOnPackOpen)?.checked ??
        false,
      accessibleCheckboxes:
        menu.getMenuItemById(MENU_IDS.toggles.accessibleCheckboxes)?.checked ??
        false,
    });

    writeConfigFile(parsed);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error('handleSaveConfig(): Error when parsing:', err.issues);
    } else console.error(getErrorMsg(err));
  }
}

function mainWindowHandlers(window: BrowserWindow) {
  window.on('close', () => {
    handleSaveConfig();
  });
}

export function resetWindowContentSize(packId: string | null) {
  const pack = packId ? getBasicPack(packId) : null;
  const size =
    pack && pack.defaultSize ? pack.defaultSize : DEFAULT_WINDOW_SIZE;
  mainWindow?.setContentSize(size.width, size.height, true);
}
