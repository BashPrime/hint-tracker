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
        'border-b border-black',
        'font-bold uppercase',
        checked && 'bg-green-900'
      )}
      onMouseDown={handleRightClick}
    >
      <p
        style={{ color: hint.color }}
        className={cn(hint.color && 'brightness-85 dark:brightness-100')}
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
