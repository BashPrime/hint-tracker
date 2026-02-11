interface Window {
  electronApi: {
    requestPresets: () => Promise<object[]>;
  };
}
