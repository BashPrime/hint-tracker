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
        'flex flex-col gap-1 p-2',
        'border-b border-zinc-400 dark:border-zinc-600',
        'font-bold uppercase',
        checked && 'bg-green-300 dark:bg-green-900'
      )}
      onMouseDown={handleRightClick}
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
          placeholder={'What?'}
          items={['Dark Beam']}
        />
      )}
      {hint.location && (
        <AtomCombobox
          atom={hint.location}
          placeholder={'Where?'}
          items={['Torvus Energy Controller']}
        />
      )}
    </div>
  );
}
