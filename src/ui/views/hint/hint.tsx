import { AtomCombobox } from '@/components/atom-combobox';
import { useRightClick } from '@/hooks/useRightClick';
import { cn } from '@/lib/utils';
import { Hint as HintType } from '@/types/hint-layout.types';
import { useAtom } from 'jotai';

type Props = {
  hint: HintType;
};

export function Hint({ hint }: Props) {
  // !STATE
  const [checked, setChecked] = useAtom(hint.checked);

  // !HOOK
  const handleRightClick = useRightClick(() => setChecked(!checked));

  return (
    <div
      className={cn(
        'gap flex flex-col pl-2',
        'font-bold uppercase',
        'border-b border-zinc-950',
        'bg-zinc-300/90 dark:bg-zinc-700/90',
        checked && 'bg-green-300/90 dark:bg-green-900/90'
      )}
      onMouseDown={handleRightClick}
      data-name="hint"
    >
      <p
        style={{ color: !checked ? hint.color : '' }}
        className={cn(
          hint.color && !checked && 'brightness-75 dark:brightness-100',
          checked && 'text-green-700 dark:text-green-400'
        )}
      >
        {hint.name}
      </p>
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
  );
}
