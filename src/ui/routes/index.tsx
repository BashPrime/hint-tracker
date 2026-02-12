import { LoadingSpinner } from '@/components/loading-spinner';
import { fetchGames } from '@/ipc';
import { cn } from '@/lib/utils';
import { gamesState } from '@/states/App.states';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';

export const Route = createFileRoute('/')({
  component: Index,
  pendingComponent: LoadingSpinner,
  loader: async () => {
    await fetchGames();
  },
});

function Index() {
  // !STATE
  const games = useAtomValue(gamesState);

  if (!games) {
    return null;
  }

  return (
    <div>
      <p className="p-2 text-center text-lg">Select a Game:</p>
      <div className="grid max-w-[400px] grid-cols-2 place-items-center gap-2 p-4 md:max-w-[600px] md:grid-cols-3">
        {games?.map((game) => (
          <Link
            to="/layouts/$layoutId"
            params={{ layoutId: game.id }}
            key={game.id}
          >
            {game.cover && (
              <img
                src={`data:image/webp;base64,${game.cover}`}
                alt={game.name}
              />
            )}
            {!game.cover && (
              <div
                className={cn(
                  'h-full w-full',
                  'flex items-center text-center',
                  'bg-neutral-900'
                )}
                data-name="cover-placeholder"
              >
                <p className="pb-6 text-xl font-bold text-neutral-50">
                  {game.name}
                </p>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
