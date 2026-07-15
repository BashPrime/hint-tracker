import { Button } from '@/components/ui/button';
import { unhintedHintsState } from '@/states/App.states';
import {
  LayoutStateUnhintedItems,
  UnhintedItemHint,
} from '@/types/state.types';
import { atom, useAtom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { LayoutHint } from './hint';

type Props = {
  unhinted: LayoutStateUnhintedItems;
};

export function UnhintedItems({ unhinted }: Props) {
  // !STATE
  const [hints, setHints] = useAtom(unhintedHintsState);

  const parsedHints = hints.map((h) => ({
    ...h,
    comboboxOptions: unhinted.comboboxOptions,
  }));

  // !FUNCTION
  function addHint() {
    setHints([
      ...hints,
      {
        name: '',
        code: `unhinted-${uuidv4()}`,
        type: 'hint',
        item: atom(''),
        location: atom(''),
        checked: atom(false),
      } satisfies UnhintedItemHint,
    ]);
  }

  return (
    <div className="flex flex-col gap-2" data-name="unhinted-items">
      <div data-name="unhinted-hints-container">
        {parsedHints.map((hint) => (
          <LayoutHint hint={hint} key={hint.code} />
        ))}
      </div>
      <Button onClick={addHint}>Add new</Button>
    </div>
  );
}
