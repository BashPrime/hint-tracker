interface Window {
  electronApi: {
    fetchPacks: () => Promise<object[]>;
    fetchPackDetails: (packId: string) => Promise<object>;
    fetchImage: (packId: string, imgPath: string) => Promise<object>;
    autosaveTrackerState: (state: object, packId: string) => void;
    loadTrackerAutosave: (packId: string) => Promise<object>;
    // ipcMain functions
    resetTracker: (callback: () => void) => void;
  };
}
