import { AtomCombobox } from '@/components/atom-combobox';
import { useRightClick } from '@/hooks/useRightClick';
import { cn } from '@/lib/utils';
import { activeLayoutState } from '@/states/App.states';
import { Hint as HintType } from '@/types/layout.types';
import { useAtom, useAtomValue } from 'jotai';
import { Check } from 'lucide-react';

type Props = {
  hint: HintType;
  className?: string;
};

export function Hint({ hint, className }: Props) {
  // !STATE
  const [checked, setChecked] = useAtom(hint.checked);
  const layout = useAtomValue(activeLayoutState)?.layout;

  // !HOOK
  const handleRightClick = useRightClick(() => setChecked(!checked));

  return (
    <div
      className={cn(
        'flex flex-col pl-2',
        'font-bold uppercase',
        'bg-neutral-300/90 dark:bg-neutral-700/90',
        checked && 'bg-green-300/90 dark:bg-green-900/90',
        hint.grow && 'grow',
        className
      )}
      onMouseDown={handleRightClick}
      data-name="hint"
    >
      <div data-name="hint-direct-container">
        <div className={cn('flex flex-row justify-between')}>
          <p
            style={{ color: !checked ? hint.color : '' }}
            className={cn(
              layout?.numColumns && layout.numColumns > 1 && 'sm:truncate',
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
            items={['Dark Beam', 'Light Beam', 'Annihilator Beam']}
          />
        )}
        {hint.location && (
          <AtomCombobox
            atom={hint.location}
            placeholder={'Location'}
            items={[
              'Agon Temple',
              'Torvus Temple',
              'Sanctuary Temple',
              'Sanctuary Energy Controller',
              'Hall of Honored Dead',
            ]}
          />
        )}
      </div>
    </div>
  );
}
