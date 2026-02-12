interface Window {
  electronApi: {
    requestGames: () => Promise<object[]>;
    requestPresets: () => Promise<object[]>;
    requestPresetsForGame: (gameId: string) => Promise<object[]>;
  };
}
