import {
  app,
  Menu,
  MenuItemConstructorOptions,
  nativeTheme,
  shell,
} from 'electron';
import { ThemeType } from '../shared/types/base.types.js';
import { MENU_IDS, USER_DATA_DIR } from './constants.js';
import {
  exportTrackerState,
  importTrackerState,
  resetSize,
  resetTracker,
  trackerHome,
} from './ipc.js';
import { installPackDialog } from './packs.js';
import { isDev } from './util.js';
import { getMainWindow } from './window.js';

async function openUserDataFolder() {
  try {
    // Check if the path is valid and then open it
    await shell.openPath(USER_DATA_DIR);
    return { success: true };
  } catch (error) {
    console.error(
      'openUserDataFolder(): Failed to open userData directory:',
      error
    );
    return { success: false, error: error };
  }
}

function toggleAlwaysOnTop(checked: boolean) {
  const window = getMainWindow();
  window?.setAlwaysOnTop(checked);
}

function toggleTheme(theme: ThemeType) {
  nativeTheme.themeSource = theme;
}

const template: MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
      {
        id: MENU_IDS.file.trackerHome,
        label: 'Home',
        click: () => trackerHome(),
      },
      {
        id: MENU_IDS.file.installPack,
        label: 'Install Pack',
        click: () => installPackDialog(),
      },
      {
        id: MENU_IDS.file.openUserDataFolder,
        label: 'Open User Data Folder',
        click: () => openUserDataFolder(),
      },
      { type: 'separator' },
      {
        id: MENU_IDS.file.resetSize,
        label: 'Reset Size',
        click: () => resetSize(),
      },
      {
        id: MENU_IDS.file.resetTracker,
        label: 'Reset Tracker',
        click: () => resetTracker(),
      },
      { type: 'separator' },
      {
        id: MENU_IDS.file.importState,
        label: 'Import State',
        click: () => importTrackerState(),
      },
      {
        id: MENU_IDS.file.exportState,
        label: 'Export State',
        enabled: false,
        click: () => exportTrackerState(),
      },
      { type: 'separator' },
      {
        label: 'Exit',
        role: 'quit',
      },
    ],
  },
  {
    label: 'Toggles',
    submenu: [
      {
        id: MENU_IDS.toggles.alwaysOnTop,
        label: 'Always on Top',
        type: 'checkbox',
        checked: false,
        click: (item) => toggleAlwaysOnTop(item.checked),
      },
      {
        id: MENU_IDS.toggles.resetSizeOnPackOpen,
        label: 'Reset Size when Opening Tracker',
        type: 'checkbox',
        checked: false,
      },
      {
        label: 'Theme',
        submenu: [
          {
            id: MENU_IDS.theme.system,
            label: 'System',
            type: 'radio',
            checked: true,
            click: () => toggleTheme('system'),
          },
          {
            id: MENU_IDS.theme.light,
            label: 'Light',
            type: 'radio',
            checked: false,
            click: () => toggleTheme('light'),
          },
          {
            id: MENU_IDS.theme.dark,
            label: 'Dark',
            type: 'radio',
            checked: false,
            click: () => toggleTheme('dark'),
          },
        ],
      },
    ],
  },
  isDev()
    ? { role: 'viewMenu' }
    : {
        label: 'View',
        submenu: [
          { role: 'resetZoom' },
          { role: 'zoomIn' },
          { role: 'zoomOut' },
        ],
      },
  { label: 'Help', submenu: [{ label: 'About', role: 'about' }] },
  { label: `Version ${app.getVersion()}` },
];

export const menu = Menu.buildFromTemplate(template);
