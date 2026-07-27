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
import { Plus, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Header } from './header';
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
        'bg-zinc-100 dark:bg-zinc-800',
        'flex flex-auto flex-col px-1.5 py-1',
        'border border-zinc-300 dark:border-zinc-900',
        checked && 'bg-green-300/90 dark:bg-green-900/90'
      )}
      onMouseDown={handleRightClick}
      data-name="layout-hint"
    >
      <div className={cn('flex flex-row items-center justify-between')}>
        <div className="flex w-full flex-row gap-2">
          <HintChecked checked={checked} />
          <div className="flex-1" data-name="hints-container">
            {hint.item && (
              <AtomCombobox
                atom={hint.item}
                placeholder="Item"
                options={itemOptions}
              />
            )}
            {hint.location && (
              <AtomCombobox
                atom={hint.location}
                placeholder="Location"
                options={locationOptions}
              />
            )}
          </div>
        </div>

        <Button
          tabIndex={0}
          variant="ghost"
          size="icon"
          onClick={() => onDelete(hint.code)}
          className={cn(
            'cursor-pointer text-red-600 dark:text-red-500',
            'hover:bg-red-300 dark:hover:bg-red-400 dark:hover:text-black',
            checked && 'text-red-500'
          )}
        >
          <X className="size-6" />
        </Button>
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
  // !WHY it's an arbitrary limit, but most players likely won't be using that many unhinted items
  const lengthLimit = 50;

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
            <Hint hint={hint} key={hint.code} onDelete={deleteHint} />
          ))}
        </div>
      </div>
    </div>
  );
}
