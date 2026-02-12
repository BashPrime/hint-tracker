interface Window {
  electronApi: {
    requestGames: () => Promise<object[]>;
    requestPresets: () => Promise<object[]>;
  };
}
