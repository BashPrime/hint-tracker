import { fetchPackDetails, fetchPacks } from '@/ipc';
import { packsState } from '@/states/App.states';
import { createFileRoute } from '@tanstack/react-router';
import { getDefaultStore } from 'jotai';

export const Route = createFileRoute('/packs/$packId')({
  component: PackLayout,
  beforeLoad: async () => {
    const store = getDefaultStore();
    const packs = store.get(packsState);

    if (!packs) {
      await fetchPacks();
    }
  },
  loader: async ({ params }) => {
    await fetchPackDetails(params.packId);
  },
});

function PackLayout() {
  return <div>Hello "/packs/$packId"!</div>;
}
