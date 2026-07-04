import { AtomCombobox } from '@/components/atom-combobox';
import { useComboboxOptions } from '@/hooks/useComboboxOptions';
import { atom } from 'jotai';
import {
  Autofills,
  LayoutHint as LayoutHintType,
} from 'src/shared/types/layout.types';

type Props = {
  hint: LayoutHintType;
  comboboxOptions?: Autofills;
};

const itemAtom = atom('');
const locationAtom = atom('');

export function LayoutHint({ hint, comboboxOptions }: Props) {
  const optionsToUse = comboboxOptions ? comboboxOptions : hint.autofills;

  // !HOOKS
  const options = useComboboxOptions(optionsToUse ?? {});

  return (
    <div data-name="layout-hint">
      <p className="font-semibold">{hint.name}</p>
      {hint.hintType !== 'location' && (
        <AtomCombobox
          atom={itemAtom}
          placeholder={'Item'}
          items={options.item}
        />
      )}
      {hint.hintType !== 'item' && (
        <AtomCombobox
          atom={locationAtom}
          placeholder={'Location'}
          items={options.location}
        />
      )}
    </div>
  );
}
