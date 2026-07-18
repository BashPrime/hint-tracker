import { LoadingSpinner } from '@/components/loading-spinner';
import { fetchPacks } from '@/ipc';
import { PackSelection } from '@/views/layout/pack-selection';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
  pendingComponent: LoadingSpinner,
  loader: async () => {
    await fetchPacks();
  },
});

function Index() {
  return (
    <div data-name="route-index">
      <PackSelection />
    </div>
  );
}
