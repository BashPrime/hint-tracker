import { cn } from '@/lib/utils';
import { activeHintLayoutState } from '@/states/App.states';
import { HintCollection as HintCollectionType } from '@/types/layout.types';
import { useAtomValue } from 'jotai';
import { GRID_BREAKPOINTS } from 'src/shared/constants';
import { Hint } from '.';

type Props = {
  collection: HintCollectionType;
};

export function HintCollection({ collection }: Props) {
  const layout = useAtomValue(activeHintLayoutState)?.layout;

  return (
    <div data-name="hint-collection">
      {collection.name && (
        <p style={{ color: collection.color }}>{collection.name}</p>
      )}
      <div
        style={{
          gridTemplateColumns: collection.numColumns
            ? `repeat(${collection.numColumns}, minmax(0, 1fr))`
            : 'unset',
        }}
        className={cn(
          layout &&
            collection.numColumns &&
            GRID_BREAKPOINTS[layout.gridBreakpoint]
        )}
      >
        {collection.hints.map((hint, idx) => (
          <Hint
            key={`hint-${idx}`}
            hint={hint}
            className={cn(
              collection.numColumns && collection.numColumns > 1
                ? 'border-r'
                : null,
              'border-b border-neutral-600 dark:border-neutral-950'
            )}
          />
        ))}
      </div>
    </div>
  );
}
