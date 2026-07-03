import { AtomCombobox } from '@/components/atom-combobox';
import { useAutofills } from '@/hooks/useAutofills';
import { atom } from 'jotai';
import {
  Autofills,
  LayoutHint as LayoutHintType,
} from 'src/shared/types/layout.types';

type Props = {
  hint: LayoutHintType;
  autofills?: Autofills;
};

const itemAtom = atom('');
const locationAtom = atom('');

export function LayoutHint({ hint, autofills }: Props) {
  // !STATE
  
  // !HOOKS
  const { location } = useAutofills();

  return (
    <div data-name="layout-hint">
      <p className="font-semibold">{hint.name}</p>
      {hint.hintType !== 'location' && (
        <AtomCombobox atom={itemAtom} placeholder={'Item'} items={[]} />
      )}
      {hint.hintType !== 'item' && (
        <AtomCombobox
          atom={locationAtom}
          placeholder={'Location'}
          items={location.map((l) => l.name)}
        />
      )}
    </div>
  );
}
