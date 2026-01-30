import { cn } from '@/lib/utils';
import { HintSection as HintSectionType } from '@/types/hint-layout.types';
import { HintContainer } from './hint-container';

type Props = {
  section: HintSectionType;
};

export function HintSection({ section }: Props) {
  return (
    <div
      style={{ borderLeft: `2px solid ${section.lineColor ?? 'white'}` }}
      className={cn(
        'flex flex-auto flex-col',
        'md:h-screen'
      )}
    >
      {section.header && (
        <p className="bg-zinc-400 p-1 text-lg font-bold uppercase dark:bg-zinc-900">
          {section.header}
        </p>
      )}
      <div
        style={{ scrollbarGutter: 'stable' }}
        className={cn('flex flex-col gap-2', 'scrollbar-thin md:overflow-auto')}
      >
        {section.content.map((container, idx) => (
          <HintContainer key={`container-${idx}`} container={container} />
        ))}
      </div>
    </div>
  );
}
