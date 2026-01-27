export const MENU_IDS = {
  alwaysOnTop: 'alwaysOnTop',
  game: 'game',
  keybearerRoomLabels: {
    aether: 'aether',
    darkAether: 'darkAether',
    both: 'both',
  },
  legacyHintsEnabled: 'legacyHintsEnabled',
};

export const IPC_IDS = {
  requestRendererState: 'request-renderer-state',
  requestMainState: 'request-main-state',
  rendererTrackerState: 'renderer-tracker-state',
  resetTracker: 'reset-tracker',
  setLegacyHintsEnabled: 'set-legacy-hints-enabled',
  resetSize: 'reset-size',
  loadTrackerSession: 'load-tracker-session',
  setKeybearerRooms: 'set-keybearer-rooms',
  setGame: 'set-game',
  setPhazonSuitHint: 'set-phazon-suit-hint',
};

type WindowSize = {
  prime: Size;
  echoes: Size;
  echoesLegacy: Size;
  corruption: Size;
  default: Size;
};

type Size = {
  width: number;
  height: number;
};

// heights use a +65px offset
export const WINDOW_SIZE: WindowSize = {
  echoes: {
    width: 1345,
    height: 802,
  },
  echoesLegacy: {
    width: 1345,
    height: 862,
  },
  prime: {
    width: 640,
    height: 600,
  },
  corruption: {
    width: 640,
    height: 600,
  },
  default: {
    width: 640,
    height: 480,
  },
};
