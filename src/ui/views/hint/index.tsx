import { AtomCombobox } from '@/components/atom-combobox';
import { useRightClick } from '@/hooks/useRightClick';
import { cn } from '@/lib/utils';
import { activeGameDataOptionsSelector } from '@/states/App.states';
import { Hint as HintType } from '@/types/layout.types';
import { useAtom, useAtomValue } from 'jotai';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
  hint: HintType;
  className?: string;
};

export function Hint({ hint, className }: Props) {
  // !STATE
  const [checked, setChecked] = useAtom(hint.checked);
  const gameOptions = useAtomValue(activeGameDataOptionsSelector);
  const [itemOptions, setItemOptions] = useState<string[]>([]);
  const [locationOptions, setLocationOptions] = useState<string[]>([]);

  // !HOOK
  const handleRightClick = useRightClick(() => setChecked(!checked));
  useEffect(() => {
    const itemOptions: string[] = [];
    const locationOptions: string[] = [];

    if (gameOptions) {
      hint.options?.forEach((option) => {
        switch (option) {
          case 'items':
            itemOptions.push(...gameOptions.items);
            break;
          case 'progression':
            itemOptions.push(...gameOptions.progression);
            break;
          case 'useful':
            itemOptions.push(...gameOptions.useful);
            break;
          case 'filler':
            itemOptions.push(...gameOptions.filler);
            break;
          case 'itemFeatures':
            itemOptions.push(...gameOptions.itemFeatures);
            break;
          case 'locations':
            locationOptions.push(...gameOptions.locations);
            break;
          // case 'regions':
          //   locationOptions.push(...gameOptions.regions);
          //   break;
          case 'locationFeatures':
            locationOptions.push(...gameOptions.locationFeatures);
            break;
        }
      });
    }

    setItemOptions(itemOptions);
    setLocationOptions(locationOptions);
  }, [hint.options, gameOptions]);

  return (
    <div
      className={cn(
        'flex flex-col pl-2',
        'font-bold uppercase',
        checked && 'bg-green-300/90 dark:bg-green-900/90',
        hint.grow && 'grow',
        className
      )}
      onMouseDown={handleRightClick}
      data-name="hint"
    >
      <div className={cn('flex flex-row justify-between')}>
        <p
          style={{ color: !checked ? hint.color : '' }}
          className={cn(
            'select-none',
            // layout?.numColumns && layout.numColumns > 1 && 'sm:truncate',
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
