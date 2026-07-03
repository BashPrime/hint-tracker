import { fetchPackDetails, fetchPacks } from '@/ipc';
import { activePackState, packsState } from '@/states/App.states';
import { createFileRoute } from '@tanstack/react-router';
import { getDefaultStore, useAtomValue } from 'jotai';

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
  const pack = useAtomValue(activePackState);

  return <div>{pack?.layout.content.map((c) => <p>{c.header}</p>)}</div>;
}
