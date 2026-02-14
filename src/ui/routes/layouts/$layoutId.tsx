import { LoadingSpinner } from '@/components/loading-spinner';
import { fetchGames, fetchPresets } from '@/ipc';
import { cn } from '@/lib/utils';
import {
  activeLayoutState,
  gamesState,
  presetsState,
} from '@/states/App.states';
import { PresetToLayoutTransformSchema } from '@/types/transform.types';
import { Column } from '@/views/layout/column';
import { createFileRoute } from '@tanstack/react-router';
import { getDefaultStore, useAtomValue } from 'jotai';
import { useMediaQuery } from 'usehooks-ts';
import z from 'zod';

export const Route = createFileRoute('/layouts/$layoutId')({
  component: Layout,
  pendingComponent: LoadingSpinner,
  beforeLoad: async () => {
    const store = getDefaultStore();
    let games = store.get(gamesState);
    const presets = store.get(presetsState);

    if (!games) {
      await fetchGames();
      games = store.get(gamesState);
    }

    if (!presets) {
      await fetchPresets();
    }
  },
  loader: async ({ params }) => {
    const store = getDefaultStore();
    const presets = store.get(presetsState);
    const presetMatch = presets?.find(
      (preset) => preset.id === params.layoutId
    );

    if (presetMatch) {
      try {
        const parsed = PresetToLayoutTransformSchema.parse(presetMatch);
        store.set(activeLayoutState, parsed);
      } catch (err) {
        if (err instanceof z.ZodError) {
          console.error(
            '$layoutId loader(): Error parsing layout data',
            presetMatch,
            err.issues
          );
        }
      }
    } else {
      store.set(activeLayoutState, null);
    }
  },
});

function Layout() {
  // !HOOKS
  const layout = useAtomValue(activeLayoutState)?.layout;
  const matches = useMediaQuery('(min-width: 64rem)');

  if (!layout) {
    return null;
  }

  return (
    <div
      style={{
        gridTemplateColumns:
          matches && layout.numColumns > 3
            ? `repeat(${layout.numColumns}, minmax(0, 1fr))`
            : undefined,
      }}
      className={cn(
        'grid h-full grid-cols-1 gap-2',
        'overflow-none',
        layout.numColumns >= 2 && 'sm:grid-cols-2',
        layout.numColumns >= 3 && 'md:grid-cols-3'
      )}
      data-name="layout-root"
    >
      {layout.columns.map((column, idx) => (
        <Column key={`column-${idx}`} column={column} />
      ))}
    </div>
  );
}
