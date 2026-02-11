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
                  className={cn(
                    'border-b border-neutral-600 dark:border-neutral-950',
                    collection.grow && 'grow',
                    collection.numColumns && collection.numColumns > 1
                      ? 'border-r'
                      : null
                  )}
                />
              ))}
            </div>
          );
        }
        return (
          <Hint
            key={`hint-${idx}`}
            hint={hintsElem}
            className={cn(
              'border-b border-neutral-600 dark:border-neutral-950',
              collection.grow && 'grow',
              collection.numColumns && collection.numColumns > 1
                ? 'border-r'
                : null
            )}
          />
        );
      })}
    </div>
  );
}
