import { HintCollection as HintCollectionType } from '@/types/layout.types';
import { Hint } from '.';

type Props = {
  collection: HintCollectionType;
};

export function HintCollection({ collection }: Props) {
  return (
    <div data-name="hint-collection">
      {collection.name && (
        <p style={{ color: collection.color }}>{collection.name}</p>
      )}
      {collection.hints.map((hint, idx) => (
        <Hint key={`hint-${idx}`} hint={hint} />
      ))}
    </div>
  );
}
