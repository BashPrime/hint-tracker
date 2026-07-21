import { LoadingSpinner } from '@/components/loading-spinner';
import { fetchPacks } from '@/ipc';
import { PackSelection } from '@/views/layout/pack-selection';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
  pendingComponent: () => <LoadingSpinner text="Getting Packs..." />,
  loader: async () => {
    await fetchPacks();
  },
  gcTime: 0,
  pendingMs: 0,
  pendingMinMs: 300,
});

// oxlint-disable-next-line react/only-export-components
function Index() {
  return (
    <div data-name="route-index">
      <PackSelection />
    </div>
  );
}
