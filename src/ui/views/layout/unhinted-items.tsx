import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  unhintedHintsState,
  unhintedItemsLimitAtom,
} from '@/states/App.states';
import {
  LayoutStateUnhintedItems,
  UnhintedItemHint,
} from '@/types/state.types';
import { atom, useAtom, useAtomValue } from 'jotai';
import { Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Header } from './header';
import { LayoutHint } from './hint';

type Props = {
  unhinted: LayoutStateUnhintedItems;
};

export function UnhintedItems({ unhinted }: Props) {
  // !STATE
  const [hints, setHints] = useAtom(unhintedHintsState);
  const lengthLimit = useAtomValue(unhintedItemsLimitAtom);

  const parsedHints = hints.map((h) => ({
    ...h,
    comboboxOptions: unhinted.comboboxOptions,
  }));

  // !FUNCTION
  function addHint() {
    // only add another hint if below the limit
    if (hints.length < lengthLimit) {
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
  }

  function deleteHint(code: string) {
    setHints(hints.filter((h) => h.code !== code));
  }

  return (
    <div
      className={cn('flex min-h-0 flex-1 flex-col')}
      data-name="unhinted-items"
      style={{
        borderLeft: unhinted.borderColor
          ? `2px solid ${unhinted.borderColor}`
          : undefined,
      }}
    >
      {unhinted.header && (
        <Header color={unhinted.color}>{unhinted.header}</Header>
      )}
      <div className="flex min-h-0 flex-col" data-name="uh-body">
        <Button
          variant="secondary"
          onClick={addHint}
          className={cn(
            'w-full cursor-pointer place-self-center rounded-none',
            'text-lg font-bold uppercase'
          )}
          disabled={hints.length >= lengthLimit}
          data-name="add-hint-button"
        >
          <Plus className="size-6" /> Add New
        </Button>
        <div className="overflow-y-auto" data-name="uh-hints">
          {parsedHints.map((hint) => (
            <LayoutHint hint={hint} key={hint.code} onDelete={deleteHint} />
          ))}
        </div>
      </div>
    </div>
  );
}
