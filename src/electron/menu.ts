import { app, Menu, MenuItemConstructorOptions, nativeTheme } from 'electron';
import { ThemeType } from '../shared/base.types.js';
import { MENU_IDS } from './constants.js';
import { isDev } from './util.js';
import { getMainWindow } from './window.js';

function toggleAlwaysOnTop(checked: boolean) {
  const window = getMainWindow();
  window?.setAlwaysOnTop(checked);
}

function toggleTheme(theme: ThemeType) {
  nativeTheme.themeSource = theme;
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
