import { AtomCombobox } from '@/components/atom-combobox';
import { useComboboxOptionsBuilder } from '@/hooks/useComboboxOptionsBuilder';
import { useRightClick } from '@/hooks/useRightClick';
import { cn } from '@/lib/utils';
import { HintWithState } from '@/types/state.types';
import { useAtom } from 'jotai';
import { Check } from 'lucide-react';

type Props = {
  hint: HintWithState;
};

export function LayoutHint({ hint }: Props) {
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
        'flex flex-col pl-2',
        'font-bold uppercase',
        checked && 'bg-green-300/90 dark:bg-green-900/90'
      )}
      onMouseDown={handleRightClick}
      data-name="layout-hint"
    >
      <div className={cn('flex flex-row justify-between')}>
        <p
          style={{ color: !checked ? hint.color : '' }}
          className={cn(
            'select-none',
            hint.color && !checked && 'brightness-75 dark:brightness-100',
            checked && 'text-green-800 dark:text-green-400'
          )}
        >
          {hint.name}
        </p>
        <Check
          className={cn(
            'text-green-800 dark:text-green-300',
            'mx-1 my-0.5 h-4 w-4',
            !checked && 'opacity-0'
          )}
        />
      </div>
      {hint.item && (
        <AtomCombobox
          atom={hint.item}
          placeholder={'Item'}
          items={itemOptions}
        />
      )}
      {hint.location && (
        <AtomCombobox
          atom={hint.location}
          placeholder={'Location'}
          items={locationOptions}
        />
      )}
    </div>
  );
}
