import {
  Column as ColumnType,
  HintCollectionSchema,
  HintPanelSchema,
  HintSchema,
} from '@/types/layout.types';

type Props = {
  column: ColumnType;
};

export function Column({ column }: Props) {
  const parsedHint = HintSchema.safeParse(column);
  const parsedCollection = HintCollectionSchema.safeParse(column);
  const parsedPanel = HintPanelSchema.safeParse(column);

  return (
    <div>
      {parsedHint.success && <p>Parsed Hint</p>}
      {parsedCollection.success && <p>Parsed Collection</p>}
      {parsedPanel.success && <p>Parsed Panel</p>}
    </div>
  );
}
