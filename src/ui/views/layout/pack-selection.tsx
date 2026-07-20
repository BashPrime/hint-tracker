import { GameCover } from '@/components/game-cover';
import { cn } from '@/lib/utils';
import { packsState } from '@/states/App.states';
import { Link } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { User } from 'lucide-react';

export function PackSelection() {
  // !STATE
  const packs = useAtomValue(packsState);

  if (!(packs && packs.length)) {
    return (
      <div data-name="pack-selection-no-packs">
        <div className="flex flex-col items-center">
          <p className="p-2 text-center text-4xl font-bold uppercase">
            No Packs Installed!
          </p>
          <p className="text-2xl">
            Packs can be installed from the menu by going to:
          </p>
          <p className="font-mono text-2xl font-bold">
            {'File > Install Pack'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div data-name="pack-selection">
      <div
        className="flex flex-col items-center gap-1"
        data-name="selection-header"
      >
        <p className="p-2 text-center text-4xl font-bold uppercase">
          Select a Pack
        </p>
        <div className="h-1.5 w-3/5 min-w-72 bg-[#f4B938]" />
        <div className="h-1.5 w-3/5 min-w-72 bg-[#ab4d1b]" />
      </div>
      <div
        className={cn(
          'p-4',
          'grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4'
        )}
      >
        {packs.map((pack) => (
          <Link to="/packs/$packId" params={{ packId: pack.id }} key={pack.id}>
            {/* <Card className={cn('pt-0', 'h-[280px]')}>
              <GameCover
                name={pack.cover?.name ?? ''}
                image={pack.cover ?? undefined}
                className="h-[200px] w-auto"
              />
              <CardHeader>
                <CardTitle>
                  {pack.name}{' '}
                  <span className="text-muted-foreground ml-1 text-sm font-normal">
                    v{pack.version}
                  </span>
                </CardTitle>
                <CardDescription className="flex flex-row gap-1">
                  <User size={16} />
                  {pack.author}
                </CardDescription>
              </CardHeader>
            </Card> */}
            <GameCover
              name={pack.cover?.name ?? ''}
              image={pack.cover ?? undefined}
              className="h-[280px] w-auto"
            />
            <p className="text-lg font-semibold">
              {pack.name}{' '}
              <span className="text-muted-foreground ml-1 text-sm font-normal">
                v{pack.version}
              </span>
            </p>
            <p className="text-muted-foreground flex flex-row gap-1 text-sm">
              <User size={16} />
              {pack.author}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
