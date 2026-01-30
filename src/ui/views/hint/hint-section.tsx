import { cn } from '@/lib/utils';
import { HintSection as HintSectionType } from '@/types/hint-layout.types';
import { HintContainer } from './hint-container';

type Props = {
  section: HintSectionType;
};

export function HintSection({ section }: Props) {
  return (
    <div
      style={{ borderLeft: `1px solid ${section.lineColor ?? 'white'}` }}
      className={cn(
        'flex flex-col',
        'bg-zinc-200/90 dark:bg-zinc-800/90',
        'h-screen'
      )}
    >
      {section.header && (
        <p className="bg-zinc-400 dark:bg-zinc-900 uppercase font-bold text-lg p-1">
          {section.header}
        </p>
      )}
      <div className="overflow-auto">
        {section.content.map((container, idx) => (
          <HintContainer key={`container-${idx}`} container={container} />
        ))}
      </div>
    </div>
  );
}
