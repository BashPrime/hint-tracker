import { cn } from '@/lib/utils';
import { activeHintLayoutState } from '@/states/App.states';
import {
  Column as ColumnType,
  HintCollectionSchema,
  HintPanelSchema,
  HintSchema,
} from '@/types/layout.types';
import { useAtomValue } from 'jotai';
import { Hint } from '../hint';
import { HintCollection } from '../hint/collection';
import { HintPanel } from '../hint/panel';

type Props = {
  column: ColumnType;
};

export function Column({ column }: Props) {
  const layout = useAtomValue(activeHintLayoutState)?.layout;

  const parsedHint = HintSchema.safeParse(column);
  const parsedCollection = HintCollectionSchema.safeParse(column);
  const parsedPanel = HintPanelSchema.safeParse(column);

  return (
    <div
      className={cn(
        layout?.numColumns && layout.numColumns > 1 ? 'md:h-full' : null
      )}
      data-name="column"
    >
      {parsedHint.success && <Hint hint={parsedHint.data} />}
      {parsedCollection.success && (
        <HintCollection collection={parsedCollection.data} />
      )}
      {parsedPanel.success && <HintPanel panel={parsedPanel.data} />}
    </div>
  );
}
