import { app, Menu, MenuItemConstructorOptions } from 'electron';
import { getMainWindow } from './window.js';
import { isDev } from './util.js';
import { handleSaveAppConfig, openUserProvidedTrackerFile, saveTrackerFileAs } from './config.js';
import { MENU_IDS } from './data.js';
import {
  requestRendererState,
  resetTracker,
  setGame,
  setKeybearerRoomLabels,
  setLegacyHintsEnabled,
  setPhazonSuitHint,
} from './ipc.js';
import {
  Game,
  GameSchema,
  KeybearerRooms,
  KeybearerRoomsSchema,
  PhazonSuitHint,
  PhazonSuitHintSchema,
} from '../shared/types.js';

function toggleAlwaysOnTop(checked: boolean) {
  const window = getMainWindow();
  window?.setAlwaysOnTop(checked);
  handleSaveAppConfig();
}

function toggleLegacyHints(checked: boolean) {
  setLegacyHintsEnabled(checked);
  handleSaveAppConfig();
}

function toggleKeybearerRooms(value: KeybearerRooms) {
  setKeybearerRoomLabels(value);
  handleSaveAppConfig();
}

function toggleGame(game: Game) {
  setGame(game);
  handleSaveAppConfig();
}

function togglePhazonSuitHint(value: PhazonSuitHint) {
  setPhazonSuitHint(value);
  handleSaveAppConfig();
}

const template: MenuItemConstructorOptions[] = [
  {
    label: 'Tracker',
    submenu: [
      { label: 'Reset Size', click: () => requestRendererState('reset-size') },
      { label: 'Reset Tracker', click: () => resetTracker() },
      { type: 'separator' },
      { label: 'Open', click: () => openUserProvidedTrackerFile() },
      { label: 'Save As...', click: () => saveTrackerFileAs() },
    ],
  },
  {
    label: 'Game',
    id: MENU_IDS.game,
    submenu: [
      {
        label: 'Metroid Prime',
        id: GameSchema.enum.prime,
        type: 'radio',
        checked: true,
        click: () => toggleGame(GameSchema.enum.prime),
      },
      {
        label: 'Metroid Prime 2: Echoes',
        id: GameSchema.enum.echoes,
        type: 'radio',
        checked: false,
        click: () => toggleGame(GameSchema.enum.echoes),
      },
      {
        label: 'Metroid Prime 3: Corruption',
        id: GameSchema.enum.corruption,
        type: 'radio',
        checked: false,
        click: () => toggleGame(GameSchema.enum.corruption),
      },
    ],
  },
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
        id: MENU_IDS.legacyHintsEnabled,
        label: 'Legacy Hints',
        type: 'checkbox',
        checked: false,
        click: (item) => {
          toggleLegacyHints(item.checked);
        },
      },
      {
        label: 'Prime 1 Phazon Suit Hint',
        submenu: [
          {
            id: PhazonSuitHintSchema.enum.areaName,
            label: 'Area Name',
            type: 'radio',
            checked: true,
            click: () => togglePhazonSuitHint(PhazonSuitHintSchema.enum.areaName),
          },
          {
            id: PhazonSuitHintSchema.enum.roomName,
            label: 'Room Name',
            type: 'radio',
            checked: false,
            click: () => togglePhazonSuitHint(PhazonSuitHintSchema.enum.roomName),
          },
        ],
      },
      {
        label: 'Prime 2 Keybearer Room Labels',
        submenu: [
          {
            id: MENU_IDS.keybearerRoomLabels.both,
            label: 'Both',
            type: 'radio',
            checked: true,
            click: () => toggleKeybearerRooms(KeybearerRoomsSchema.enum.both),
          },
          {
            id: MENU_IDS.keybearerRoomLabels.aether,
            label: 'Aether only',
            type: 'radio',
            checked: false,
            click: () => toggleKeybearerRooms(KeybearerRoomsSchema.enum.aether),
          },
          {
            id: MENU_IDS.keybearerRoomLabels.darkAether,
            label: 'Dark Aether only',
            type: 'radio',
            checked: false,
            click: () => toggleKeybearerRooms(KeybearerRoomsSchema.enum.darkAether),
          },
        ],
      },
    ],
  },
  isDev()
    ? { role: 'viewMenu' }
    : {
        label: 'View',
        submenu: [{ role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' }],
      },
  { label: 'Help', submenu: [{ label: 'About', role: 'about' }] },
  { label: `Version ${app.getVersion()}` },
];

export const menu = Menu.buildFromTemplate(template);
