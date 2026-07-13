import { buildLayoutState } from '@/helpers/layoutStateBuilder';
import { fetchPackDetails, fetchPacks, fetchTrackerAutosave } from '@/ipc';
import { cn } from '@/lib/utils';
import { activePackState, layoutState, packsState } from '@/states/App.states';
import { LayoutParser } from '@/views/layout/parser';
import { createFileRoute } from '@tanstack/react-router';
import { getDefaultStore, useAtomValue } from 'jotai';
import { useMediaQuery } from 'usehooks-ts';

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
    const trackerAutosaveState = await fetchTrackerAutosave(params.packId);

    const pack = store.get(activePackState);

    if (pack) {
      store.set(
        layoutState,
        buildLayoutState(pack.layout, trackerAutosaveState)
      );
    }
  },
});

function PackLayoutRoot() {
  // !STATE
  const layout = useAtomValue(layoutState);

  // !HOOKS
  const mediaQueryMatches = useMediaQuery('(min-width: 64rem)');

  if (!layout) {
    return null;
  }

  return (
    // Pack Layouts use a horizontal orientation by default.
    // So, each group element is a column rather than a row.
    <div
      style={{
        gridTemplateColumns:
          mediaQueryMatches && layout.length > 3
            ? `repeat(${layout.length}, minmax(0, 1fr))`
            : undefined,
      }}
      className={cn(
        'grid h-full grid-cols-1 gap-2',
        'overflow-none',
        layout.length >= 2 && 'sm:grid-cols-2',
        layout.length >= 3 && 'md:grid-cols-3'
      )}
      id="layout-root"
      data-name="pack-layout-root"
    >
      {layout.map((col) => (
        <LayoutParser elem={col} key={col.id} />
      ))}
    </div>
  );
}
