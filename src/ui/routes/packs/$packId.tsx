import { LoadingSpinner } from '@/components/loading-spinner';
import {
  buildLayoutState,
  buildUnhintedState,
} from '@/helpers/layoutStateBuilder';
import { useResetTracker } from '@/hooks/useResetTracker';
import {
  fetchPackDetails,
  fetchPacks,
  fetchTrackerAutosave,
  setExportTrackerStateMenuItem,
} from '@/ipc';
import { cn } from '@/lib/utils';
import {
  activePackState,
  importTrackerState,
  layoutState,
  packsState,
  trackerStateToLoad,
  unhintedHintsState,
} from '@/states/App.states';
import { LayoutParser } from '@/views/layout/parser';
import { createFileRoute } from '@tanstack/react-router';
import { getDefaultStore, useAtomValue } from 'jotai';
import { TrackerSaveState } from 'src/shared/types/config.types';
import { useMediaQuery } from 'usehooks-ts';

export const Route = createFileRoute('/packs/$packId')({
  component: PackLayoutRoot,
  pendingComponent: () => <LoadingSpinner text="Loading Tracker..." />,
  pendingMs: 0,
  pendingMinMs: 300,
  gcTime: 0,
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
      // Load either autosave or imported tracker state
      const stateToLoad = store.get(trackerStateToLoad);
      let trackerState: TrackerSaveState | undefined;

      switch (stateToLoad) {
        case 'autosave':
          trackerState = await fetchTrackerAutosave(params.packId);
          break;
        case 'import':
          trackerState = store.get(importTrackerState) ?? undefined;
          break;
      }

      // If the existing tracker state doesn't match the pack version, don't load it into the app state
      if (trackerState?.pack.version !== pack.version) {
        trackerState = undefined;
      }

      // Build the tracker state
      store.set(layoutState, buildLayoutState(pack.layout, trackerState));
      store.set(unhintedHintsState, buildUnhintedState(trackerState));
      setExportTrackerStateMenuItem(true);
    }
  },
  onLeave: async () => {
    setExportTrackerStateMenuItem(false);
    const store = getDefaultStore();
    store.set(activePackState, null);
    store.set(layoutState, null);
  },
});

function PackLayoutRoot() {
  // !STATE
  const layout = useAtomValue(layoutState);

  // !HOOKS
  useResetTracker();
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
