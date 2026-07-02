interface Window {
  electronApi: {
    fetchPacks: () => Promise<object[]>;
    fetchPackDetails: (packId: string) => Promise<object>;
  };
}
