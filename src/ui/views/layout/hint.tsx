import { AtomCombobox } from '@/components/atom-combobox';
import { useComboboxOptionsBuilder } from '@/hooks/useComboboxOptionsBuilder';
import { atom } from 'jotai';
import {
  ComboboxOptionKeys,
  LayoutHint as LayoutHintType,
} from 'src/shared/types/layout.types';

type Props = {
  hint: LayoutHintType;
  comboboxOptions?: ComboboxOptionKeys;
};

export function LayoutHint({ hint, comboboxOptions }: Props) {
  const optionsToUse = comboboxOptions ? comboboxOptions : hint.comboboxOptions;
  const itemAtom = atom('');
  const locationAtom = atom('');

  // !HOOKS
  const { buildOptions } = useComboboxOptionsBuilder();

  // !OPTIONS
  const itemOptions = buildOptions(optionsToUse?.item ?? []);
  const locationOptions = buildOptions(optionsToUse?.location ?? []);

  return (
    <div data-name="layout-hint">
      <p className="font-semibold">{hint.name}</p>
      {hint.hintType !== 'location' && (
        <AtomCombobox
          atom={itemAtom}
          placeholder={'Item'}
          items={itemOptions}
        />
      )}
      {hint.hintType !== 'item' && (
        <AtomCombobox
          atom={locationAtom}
          placeholder={'Location'}
          items={locationOptions}
        />
      )}
    </div>
  );
}
