import {
  HintCollectionSchema,
  HintCollection as HintCollectionType,
  HintSchema,
  Hint as HintType,
  MultiHintCollectionSchema,
} from '@/types/layout.types';
import { Hint } from '.';
import { HintCollection } from './collection';
import { MultiHintCollection } from './multi-collection';

type Props = {
  content: HintType | HintCollectionType;
  className?: string;
};

export function HintPanelContent({ content, className }: Props) {
  const parsedHint = HintSchema.safeParse(content);
  const parsedCollection = HintCollectionSchema.safeParse(content);
  const parsedMultiCollection = MultiHintCollectionSchema.safeParse(content);
  return (
    <>
      {parsedHint.success && (
        <Hint hint={parsedHint.data} className={className} />
      )}
      {parsedCollection.success && (
        <HintCollection
          collection={parsedCollection.data}
          className={className}
        />
      )}
      {parsedMultiCollection.success && (
        <MultiHintCollection
          data={parsedMultiCollection.data}
          className={className}
        />
      )}
    </>
  );
}
