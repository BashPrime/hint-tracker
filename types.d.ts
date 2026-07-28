interface Window {
  electronApi: {
    rendererLoaded: () => void;
    fetchPacks: () => Promise<object[]>;
    fetchPackDetails: (packId: string) => Promise<object>;
    fetchImage: (packId: string, imgPath: string) => Promise<object>;
    autosaveTrackerState: (state: object, packId: string) => void;
    loadTrackerAutosave: (packId: string) => Promise<object | null>;
    installPack: () => void;
    // ipcMain functions
    resetTracker: (callback: () => void) => () => void;
    resetSize: (callback: () => void) => () => void;
    resetSizeResponse: (packId: string | null) => void;
    trackerHome: (callback: () => void) => () => void;
    setTrackerMenuItems: (enabled: boolean) => void;
    exportTrackerState: (callback: () => void) => () => void;
    importTrackerState: (callback: (state: object) => void) => () => void;
    exportTrackerStateResponse: (state: object, packId: string | null) => void;
    setAccessibleCheckboxes: (
      callback: (enabled: boolean) => void
    ) => () => void;
  };
}
