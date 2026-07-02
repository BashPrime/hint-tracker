import { GameCover } from '@/components/game-cover';
import { LoadingSpinner } from '@/components/loading-spinner';
import { fetchCovers, fetchGames, fetchPacks } from '@/ipc';
import { cn } from '@/lib/utils';
import { packsState } from '@/states/App.states';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';

export const Route = createFileRoute('/')({
  component: Index,
  pendingComponent: LoadingSpinner,
  loader: async () => {
    await fetchPacks();
    await fetchGames();
    await fetchCovers();
  },
});

function Index() {
  // !STATE
  const packs = useAtomValue(packsState);

  if (!packs) {
    return null;
  }

  return (
    <div data-name="index-root">
      <p className="p-2 text-center text-2xl font-bold uppercase">
        Select Game
      </p>
      <div className="flex flex-wrap justify-center gap-4 p-2">
        {packs?.map((pack) => {
          return (
            <Link
              to="/games/$gameId"
              params={{ gameId: pack.data.id }}
              key={pack.data.id}
              className={cn(
                'flex flex-col items-center',
                'relative',
                'after:absolute after:inset-0 hover:after:bg-blue-400/50'
              )}
            >
              {pack.cover && <GameCover name={pack.cover.name} image={pack.cover} className="h-72" />}
              <p className="max-w-48 text-center text-xl font-semibold">
                {pack.data.name}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
