import { LoadingSpinner } from '@/components/loading-spinner';
import { fetchPacks } from '@/ipc';
import { packsState } from '@/states/App.states';
import { PackSelection } from '@/views/layout/pack-selection';
import { createFileRoute } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';

export const Route = createFileRoute('/')({
  component: Index,
  pendingComponent: LoadingSpinner,
  loader: async () => {
    await fetchPacks();
  },
});

function Index() {
  // !STATE
  const packs = useAtomValue(packsState);

  return (
    <div data-name="route-index">
      <PackSelection />
    </div>
  );
}
