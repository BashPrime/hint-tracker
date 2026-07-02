interface Window {
  electronApi: {
    requestPacks: () => Promise<object[]>;
    requestGames: () => Promise<object[]>;
    requestCovers: () => Promise<object[]>;
    requestPresets: () => Promise<object[]>;
    createNewLayoutForGame: (gameId: string) => Promise<boolean>;
    requestPresetsForGame: (gameId: string) => Promise<object[]>;
  };
}
