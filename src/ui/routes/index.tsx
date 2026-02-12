import { LoadingSpinner } from '@/components/loading-spinner';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item';
import { fetchGames } from '@/ipc';
import { gamesState } from '@/states/App.states';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { ChevronRightIcon } from 'lucide-react';

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
      <ItemGroup>
        {games?.map((game) => (
          <Link to="/layouts/$layoutId" params={{ layoutId: game.id }}>
            <Item
              key={game.id}
              className="hover:cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-800"
              variant="outline"
            >
              <ItemContent>
                <ItemTitle>{game.name}</ItemTitle>
                <ItemDescription>{game.id}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon className="size-4" />
              </ItemActions>
            </Item>
          </Link>
        ))}
      </ItemGroup>
    </div>
  );
}
