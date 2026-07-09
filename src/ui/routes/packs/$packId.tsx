import { buildLayoutState } from '@/helpers/layoutStateBuilder';
import { fetchPackDetails, fetchPacks } from '@/ipc';
import { cn } from '@/lib/utils';
import { activePackState, layoutState, packsState } from '@/states/App.states';
import { LayoutParser } from '@/views/layout/parser';
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
      store.set(layoutState, buildLayoutState(pack.layout));
    }
  },
});

function PackLayoutRoot() {
  const layout = useAtomValue(layoutState);

  if (!layout) {
    return null;
  }

  return (
    // Pack Layouts use a horizontal orientation by default.
    // So, each group element is a column rather than a row.
    <div
      className={cn(
        'grid h-full grid-cols-1 gap-2',
        'overflow-none',
        layout.length >= 2 && 'sm:grid-cols-2',
        layout.length >= 3 && 'md:grid-cols-3'
      )}
      data-name="pack-layout-root"
    >
      {layout.map((col, idx) => (
        <LayoutParser elem={col} key={`root-elem-${idx}`} />
      ))}
    </div>
  );
}
