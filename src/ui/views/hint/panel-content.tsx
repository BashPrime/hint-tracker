import {
  HintCollectionSchema,
  HintPanelContentType,
  HintSchema
} from '@/types/layout.types';
import { Hint } from '.';
import { HintCollection } from './collection';

type Props = {
  content: HintPanelContentType;
  className?: string;
};

export function HintPanelContent({ content, className }: Props) {
  const parsedHint = HintSchema.safeParse(content);
  const parsedCollection = HintCollectionSchema.safeParse(content);
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
    </>
  );
}
