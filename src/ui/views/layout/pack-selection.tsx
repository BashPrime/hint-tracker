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
    <div className="flex flex-col items-center" data-name="pack-selection">
      <div
        className="flex w-full flex-col items-center gap-1"
        data-name="selection-header"
      >
        <p className="p-2 text-center text-4xl font-bold uppercase">
          Select a Pack
        </p>
        <div className="h-1.5 w-3/5 min-w-72 bg-[#f4B938]" />
        <div className="h-1.5 w-3/5 min-w-72 bg-[#ab4d1b]" />
      </div>
      <div className={cn('flex flex-wrap gap-6 p-4')}>
        {packs.map((pack, idx) => (
          <Link
            to="/packs/$packId"
            params={{ packId: pack.id }}
            key={idx}
            className="mb-6 flex w-max break-inside-avoid flex-col gap-1"
          >
            <GameCover
              name={pack.cover?.name ?? ''}
              image={pack.cover ?? undefined}
              className="h-[280px] w-auto hover:ring hover:brightness-125"
            />
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold">{pack.name}</p>
              <p className="text-muted-foreground text-sm">v{pack.version}</p>
            </div>
            <div className="text-muted-foreground flex flex-row gap-1">
              <User size={16} />
              <p className="text-md">{pack.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
