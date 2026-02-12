import { GameCover } from '@/components/game-cover';
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
    <div data-name="index-root">
      <p className="p-2 text-center text-2xl font-bold uppercase">
        Select a Game
      </p>
      <div className="grid auto-cols-auto grid-flow-col justify-center gap-2 p-2">
        {games?.map((game) => (
          <>
            <Link
              to="/games/$gameId"
              params={{ gameId: game.id }}
              key={game.id}
              className={cn(
                'relative after:absolute after:inset-0 hover:after:bg-blue-400/50'
              )}
            >
              <GameCover name={game.name} image={game.cover} />
            </Link>
            <Link
              to="/games/$gameId"
              params={{ gameId: game.id }}
              key={game.id}
              className={cn(
                'relative after:absolute after:inset-0 hover:after:bg-blue-400/50'
              )}
            >
              <GameCover name={game.name} image={game.cover} />
            </Link>
          </>
        ))}
      </div>
    </div>
  );
}
