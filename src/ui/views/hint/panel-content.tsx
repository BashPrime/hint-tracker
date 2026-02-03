import {
  HintCollectionSchema,
  HintCollection as HintCollectionType,
  HintSchema,
  Hint as HintType,
} from '@/types/layout.types';
import { Hint } from '.';
import { HintCollection } from './collection';

type Props = {
  content: HintType | HintCollectionType;
};

export function HintPanelContent({ content }: Props) {
  const parsedHint = HintSchema.safeParse(content);
  const parsedCollection = HintCollectionSchema.safeParse(content);
  return (
    <div data-name="hint-panel-content">
      {parsedHint.success && <Hint hint={parsedHint.data} />}
      {parsedCollection.success && (
        <HintCollection collection={parsedCollection.data} />
      )}
    </div>
  );
}
