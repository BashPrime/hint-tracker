import { cn } from '@/lib/utils';
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
    <div
      className={cn('scrollbar-thin md:overflow-auto')}
      data-name="hint-panel-content"
    >
      {parsedHint.success && <Hint hint={parsedHint.data} />}
      {parsedCollection.success && (
        <HintCollection collection={parsedCollection.data} />
      )}
    </div>
  );
}
