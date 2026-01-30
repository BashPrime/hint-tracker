interface Window {
  electronApi: {
    // Requests from renderer process
    requestPresets: () => void;
    // Main process handlers with callbacks
    presetsResponse: (callback: (presets: object[]) => void) => void;
    toggleAppearance: (callback: (presets: string) => void) => void;
  };
}
