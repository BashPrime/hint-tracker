import { GameCover } from '@/components/game-cover';
import { LoadingSpinner } from '@/components/loading-spinner';
import { fetchCovers, fetchGames } from '@/ipc';
import { cn } from '@/lib/utils';
import { coversState, gamesState } from '@/states/App.states';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';

export const Route = createFileRoute('/')({
  component: Index,
  pendingComponent: LoadingSpinner,
  loader: async () => {
    await fetchGames();
    await fetchCovers();
  },
});

function Index() {
  // !STATE
  const games = useAtomValue(gamesState);
  const covers = useAtomValue(coversState);

  if (!games) {
    return null;
  }

  return (
    <div data-name="index-root">
      <p className="p-2 text-center text-2xl font-bold uppercase">
        Select a Game
      </p>
      <div className="flex flex-wrap justify-center gap-4 p-2">
        {games?.map((game) => {
          const cover = covers?.find((cover) => cover.name === game.coverImg);
          return (
            <Link
              to="/games/$gameId"
              params={{ gameId: game.id }}
              key={game.id}
              className={cn(
                'relative after:absolute after:inset-0 hover:after:bg-blue-400/50'
              )}
            >
              <GameCover name={game.name} image={cover} className="h-84" />
              <p className="text-center text-lg font-semibold">{game.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
