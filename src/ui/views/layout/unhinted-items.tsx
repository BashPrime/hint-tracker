import { AtomCombobox } from '@/components/atom-combobox';
import { Button } from '@/components/ui/button';
import { useComboboxOptionsBuilder } from '@/hooks/useComboboxOptionsBuilder';
import { useRightClick } from '@/hooks/useRightClick';
import { cn } from '@/lib/utils';
import { unhintedHintsState } from '@/states/App.states';
import {
  LayoutStateUnhintedItems,
  UnhintedItemHint,
} from '@/types/state.types';
import { atom, useAtom } from 'jotai';
import { CircleMinus, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { HintChecked } from './hint';

type HintProps = {
  hint: UnhintedItemHint;
  onDelete: (code: string) => void;
};

function Hint({ hint, onDelete }: HintProps) {
  // !STATE
  const [checked, setChecked] = useAtom(hint.checked);

  // !HOOKS
  const handleRightClick = useRightClick(() => setChecked(!checked));
  const { buildOptions } = useComboboxOptionsBuilder();

  // !OPTIONS
  const itemOptions = buildOptions(hint.comboboxOptions?.item ?? []);
  const locationOptions = buildOptions(hint.comboboxOptions?.location ?? []);

  return (
    <div
      className={cn(
        'bg-zinc-200 dark:bg-zinc-800',
        'flex flex-auto flex-col px-1.5 py-1',
        'border border-zinc-300 dark:border-zinc-900',
        checked && 'bg-green-300/90 dark:bg-green-900/90'
      )}
      onMouseDown={handleRightClick}
      data-name="layout-hint"
    >
      <div className={cn('flex flex-row items-center justify-between')}>
        <div className="flex flex-row gap-2">
          <HintChecked checked={checked} />
          <div data-name="hints-container">
            {hint.item && (
              <AtomCombobox
                atom={hint.item}
                placeholder="Item"
                items={itemOptions}
              />
            )}
            {hint.location && (
              <AtomCombobox
                atom={hint.location}
                placeholder="Location"
                items={locationOptions}
              />
            )}
          </div>
        </div>
        <CircleMinus
          size={18}
          className={cn(
            'fill-white text-red-700 dark:text-red-600',
            'cursor-pointer'
          )}
          onClick={() => onDelete(hint.code)}
        />
      </div>
    </div>
  );
}

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

  function deleteHint(code: string) {
    setHints(hints.filter((h) => h.code !== code));
  }

  return (
    <div className="flex flex-col gap-2" data-name="unhinted-items">
      <div data-name="unhinted-hints-container">
        {parsedHints.map((hint) => (
          <Hint hint={hint} key={hint.code} onDelete={deleteHint} />
        ))}
      </div>
      <Button
        onClick={addHint}
        variant="outline"
        className={cn('cursor-pointer place-self-center')}
      >
        <Plus /> Add new hint
      </Button>
    </div>
  );
}
