import { cn } from '@/lib/utils';
import { HintCollection as HintCollectionType } from '@/types/layout.types';
import { Hint } from '.';

type Props = {
  collection: HintCollectionType;
  className?: string;
};

export function HintCollection({ collection, className }: Props) {
  return (
    <div
      style={{
        gridTemplateColumns: collection.numColumns
          ? `repeat(${collection.numColumns}, minmax(0, 1fr))`
          : undefined,
      }}
      className={cn(
        'shadow-md dark:shadow-none',
        'bg-neutral-200/90 dark:bg-neutral-700/90',
        collection.grow && 'flex h-full flex-col',
        collection.numColumns && 'grid',
        className
      )}
      data-name="hint-collection"
    >
      {collection.hints.map((hintsElem, idx) => {
        if (Array.isArray(hintsElem)) {
          return (
            <div className="flex flex-col" data-name="nested-hints-container">
              {hintsElem.map((hint) => (
                <Hint
                  key={`hint-${idx}`}
                  hint={hint}
                  className={cn(collection.grow && 'grow')}
                />
              ))}
            </div>
          );
        }
        return (
          <Hint
            key={`hint-${idx}`}
            hint={hintsElem}
            className={cn(collection.grow && 'grow')}
          />
        );
      })}
    </div>
  );
}
