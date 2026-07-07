import { fetchPackDetails, fetchPacks } from '@/ipc';
import {
  activePackState,
  packsState
} from '@/states/App.states';
import { LayoutGroup } from '@/views/layout/group';
import { createFileRoute } from '@tanstack/react-router';
import { getDefaultStore, useAtomValue } from 'jotai';

export const Route = createFileRoute('/packs/$packId')({
  component: PackLayoutRoot,
  beforeLoad: async () => {
    const store = getDefaultStore();
    const packs = store.get(packsState);

    if (!packs) {
      await fetchPacks();
    }
  },
  loader: async ({ params }) => {
    const store = getDefaultStore();
    await fetchPackDetails(params.packId);

    const pack = store.get(activePackState);

    if (pack) {
      // const asdf = buildLayoutState(pack.layout);
      // console.log(true)
    }
  },
});

function PackLayoutRoot() {
  const pack = useAtomValue(activePackState);
  const layout = pack?.layout ?? null;

  if (!layout) {
    return null;
  }

  return (
    // Pack Layouts use a horizontal orientation by default.
    // So, each group element is a column rather than a row.
    <div className="flex flex-row gap-4" data-name="pack-layout-root">
      {layout.content.map((col, idx) => (
        <LayoutGroup group={col} key={`root-group-${idx}`} />
      ))}
    </div>
  );
}
