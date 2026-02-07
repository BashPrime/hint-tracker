import { cn } from '@/lib/utils';
import { MultiHintCollection as MultiHintCollectionType } from '@/types/layout.types';
import { HintCollection } from './collection';

type Props = {
  data: MultiHintCollectionType;
  className?: string;
};

export function MultiHintCollection({ data, className }: Props) {
  return (
    <div
      style={{
        gridTemplateColumns: data.numColumns
          ? `repeat(${data.numColumns}, minmax(0, 1fr))`
          : undefined,
      }}
      className={cn(
        data.grow && 'flex h-full flex-col',
        data.numColumns && 'grid',
        className
      )}
      data-name="multi-hint-collection"
    >
      {data.collections.map((collection, idx) => (
        <HintCollection
          key={`collection-${idx}`}
          collection={collection}
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
