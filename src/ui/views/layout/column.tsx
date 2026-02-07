import {
  Column as ColumnType,
  HintCollectionSchema,
  HintPanelSchema,
  HintSchema,
  MultiHintCollectionSchema,
} from '@/types/layout.types';
import { Hint } from '../hint';
import { HintCollection } from '../hint/collection';
import { MultiHintCollection } from '../hint/multi-collection';
import { HintPanel } from '../hint/panel';

type Props = {
  column: ColumnType;
};

export function Column({ column }: Props) {
  const parsedHint = HintSchema.safeParse(column);
  const parsedMultiCollection = MultiHintCollectionSchema.safeParse(column);
  const parsedCollection = HintCollectionSchema.safeParse(column);
  const parsedPanel = HintPanelSchema.safeParse(column);

  return (
    <>
      {parsedHint.success && <Hint hint={parsedHint.data} />}
      {parsedCollection.success && (
        <HintCollection collection={parsedCollection.data} />
      )}
      {parsedMultiCollection.success && (
        <MultiHintCollection data={parsedMultiCollection.data} />
      )}
      {parsedPanel.success && <HintPanel panel={parsedPanel.data} />}
    </>
  );
}
