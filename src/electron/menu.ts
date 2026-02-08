import { app, Menu, MenuItemConstructorOptions, nativeTheme } from 'electron';
import { MENU_IDS } from './constants.js';
import { isDev } from './util.js';
import { getMainWindow } from './window.js';

function toggleAlwaysOnTop(checked: boolean) {
  const window = getMainWindow();
  window?.setAlwaysOnTop(checked);
}

function toggleAppearanceMode(appearance: 'system' | 'light' | 'dark') {
  nativeTheme.themeSource = appearance;
  // ipcToggleAppearance(appearance);
}

const template: MenuItemConstructorOptions[] = [
  // {
  //   label: 'Tracker',
  //   submenu: [
  //     { label: 'Reset Size', click: () => requestRendererState('reset-size') },
  //     { label: 'Reset Tracker', click: () => resetTracker() },
  //     { type: 'separator' },
  //     { label: 'Open', click: () => openUserProvidedTrackerFile() },
  //     { label: 'Save As...', click: () => saveTrackerFileAs() },
  //   ],
  // },
  {
    label: 'Toggles',
    submenu: [
      {
        id: MENU_IDS.alwaysOnTop,
        label: 'Always on Top',
        type: 'checkbox',
        checked: false,
        click: (item) => toggleAlwaysOnTop(item.checked),
      },
      {
        label: 'Appearance',
        submenu: [
          {
            id: MENU_IDS.appearance.system,
            label: 'System',
            type: 'radio',
            checked: true,
            click: () => toggleAppearanceMode('system'),
          },
          {
            id: MENU_IDS.appearance.light,
            label: 'Light',
            type: 'radio',
            checked: false,
            click: () => toggleAppearanceMode('light'),
          },
          {
            id: MENU_IDS.appearance.dark,
            label: 'Dark',
            type: 'radio',
            checked: false,
            click: () => toggleAppearanceMode('dark'),
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
