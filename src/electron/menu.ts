import { app, Menu, MenuItemConstructorOptions } from 'electron';
import { Game, KeybearerRooms, PhazonSuitHint } from '../shared/types.js';
// import { handleSaveAppConfig, openUserProvidedTrackerFile, saveTrackerFileAs } from './config.js';
import { MENU_IDS } from './constants.js';
// import { setGame, setKeybearerRoomLabels, setLegacyHintsEnabled, setPhazonSuitHint } from './ipc.js';
import { isDev } from './util.js';
import { getMainWindow } from './window.js';

function toggleAlwaysOnTop(checked: boolean) {
  const window = getMainWindow();
  window?.setAlwaysOnTop(checked);
  // handleSaveAppConfig();
}

function toggleLegacyHints(checked: boolean) {
  // setLegacyHintsEnabled(checked);
  // handleSaveAppConfig();
}

function toggleKeybearerRooms(value: KeybearerRooms) {
  // setKeybearerRoomLabels(value);
  // handleSaveAppConfig();
}

function toggleGame(game: Game) {
  // setGame(game);
  // handleSaveAppConfig();
}

function togglePhazonSuitHint(value: PhazonSuitHint) {
  // setPhazonSuitHint(value);
  // handleSaveAppConfig();
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
