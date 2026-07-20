import { AtomCombobox } from '@/components/atom-combobox';
import { useComboboxOptionsBuilder } from '@/hooks/useComboboxOptionsBuilder';
import { useRightClick } from '@/hooks/useRightClick';
import { fetchImage } from '@/ipc';
import { cn } from '@/lib/utils';
import { activePackState } from '@/states/App.states';
import { HintWithState } from '@/types/state.types';
import { useAtom, useAtomValue } from 'jotai';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Image } from 'src/shared/types/image.types';

type HintCheckedProps = {
  checked: boolean;
  className?: string;
};

export function HintChecked({ checked, className }: HintCheckedProps) {
  return (
    <Check
      className={cn(
        'text-green-800 dark:text-green-300',
        'mx-1 my-0.5 h-4 w-4',
        !checked && 'opacity-0',
        className
      )}
    />
  );
}

type Props = {
  hint: HintWithState;
};

export function LayoutHint({ hint }: Props) {
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
  }, [pack]);

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
      style={{
        borderLeft: hint.borderColor
          ? `2px solid ${hint.borderColor}`
          : undefined,
      }}
      onMouseDown={handleRightClick}
      data-name="layout-hint"
    >
      {image && (
        <div className="mb-1 w-24 select-none" data-name="hint-img">
          <img
            src={`data:image/${image.type};base64,${image.data}`}
            title={hint.name}
            alt={`Image for ${hint.name}`}
          />
        </div>
      )}
      <div
        className={cn(
          'flex flex-row',
          hint.name && 'justify-between',
          !hint.name && 'h-0 justify-end'
        )}
      >
        {hint.name && (
          <p
            style={{ color: !checked ? hint.color : '' }}
            className={cn(
              'text-sm font-bold uppercase select-none',
              hint.color && !checked && 'brightness-75 dark:brightness-100',
              checked && 'text-green-800 dark:text-green-400'
            )}
          >
            {hint.name}
          </p>
        )}
        <HintChecked checked={checked} />
      </div>
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
    </div>
  );
}
