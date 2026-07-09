interface Window {
  electronApi: {
    fetchPacks: () => Promise<object[]>;
    fetchPackDetails: (packId: string) => Promise<object>;
    fetchImage: (packId: string, imgPath: string) => Promise<object>;
  };
}
