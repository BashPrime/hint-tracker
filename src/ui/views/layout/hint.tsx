import { AtomCombobox } from '@/components/atom-combobox';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useComboboxOptionsBuilder } from '@/hooks/useComboboxOptionsBuilder';
import { useRightClick } from '@/hooks/useRightClick';
import { fetchImage } from '@/ipc';
import { cn } from '@/lib/utils';
import {
  accessibleCheckboxesState,
  activePackState,
} from '@/states/App.states';
import { HintWithState } from '@/types/state.types';
import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Image } from '../../../shared/types/image.types';

type HintCheckedProps = {
  checkedAtom: PrimitiveAtom<boolean>;
  className?: string;
};

export function HintChecked({ checkedAtom, className }: HintCheckedProps) {
  // !STATE
  const accessibleCheckboxes = useAtomValue(accessibleCheckboxesState);
  const [checked, setChecked] = useAtom(checkedAtom);

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={setChecked}
      disabled={!accessibleCheckboxes}
      className={cn(
        'border-zinc-400 dark:border-zinc-600',
        'data-checked:bg-zinc-200 data-checked:text-green-950',
        'data-checked:dark:border-zinc-600',
        !accessibleCheckboxes && !checked && 'invisible',
        accessibleCheckboxes && 'cursor-pointer',
        className
      )}
    />
  );
}

type Props = {
  hint: HintWithState;
  onDelete?: (code: string) => void;
};

export function LayoutHint({ hint, onDelete }: Props) {
  // !STATE
  const pack = useAtomValue(activePackState);
  const [checked, setChecked] = useAtom(hint.checked);
  const [image, setImage] = useState<Image | null>(null);

  // !HOOKS
  const handleRightClick = useRightClick(() => setChecked(!checked));
  const { buildOptions } = useComboboxOptionsBuilder();

  useEffect(() => {
    async function fetchHintImage() {
      if (pack && hint.image) {
        setImage(await fetchImage(pack.id, hint.image));
      }

      return null;
    }

    fetchHintImage();
  }, [pack, hint]);

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
      style={{
        borderLeft: hint.borderColor
          ? `2px solid ${hint.borderColor}`
          : undefined,
      }}
      onMouseDown={handleRightClick}
      data-name="layout-hint"
    >
      {hint.item && (
        <AtomCombobox
          atom={hint.item}
          placeholder={'Item'}
          options={itemOptions}
        />
      )}
      {hint.location && (
        <AtomCombobox
          atom={hint.location}
          placeholder={'Location'}
          options={locationOptions}
        />
      )}
      {image && (
        <div className="order-first mb-1 w-24 select-none" data-name="hint-img">
          <img
            src={`data:image/${image.type};base64,${image.data}`}
            title={hint.code}
            alt={`Image for ${hint.code}`}
          />
        </div>
      )}
      <div
        className={cn(
          'order-[-9998]',
          'flex flex-row',
          hint.name && 'gap-2 items-start justify-between',
          !hint.name && 'h-0 justify-end'
        )}
      >
        {hint.name && (
          <p
            style={{ color: !checked ? hint.color : '' }}
            className={cn(
              'text-sm font-bold uppercase select-none',
              hint.color && !checked && 'brightness-67 dark:brightness-100',
              checked && 'text-green-800 dark:text-green-400'
            )}
          >
            {hint.name}
          </p>
        )}
        <div
          className={cn(
            'z-10 mr-0.75', // prevents weird scrolling behavior
            'flex flex-row items-center gap-1',
            !hint.name && 'mt-2.5'
          )}
          data-name="hint-buttons"
        >
          <HintChecked
            checkedAtom={hint.checked}
            className="size-5 select-none z-11"
          />
          {onDelete && (
            <Button
              tabIndex={0}
              size="icon"
              variant="ghost"
              onDoubleClick={() => onDelete(hint.code)}
              className={cn(
                'cursor-pointer select-none z-12',
                'text-red-600 dark:text-red-500',
                'hover:bg-red-300 dark:hover:bg-red-400 dark:hover:text-black',
                checked && 'text-red-700 dark:text-red-600'
              )}
            >
              <X className="size-6" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
