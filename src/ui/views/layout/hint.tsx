import { AtomCombobox } from '@/components/atom-combobox';
import { useComboboxOptionsBuilder } from '@/hooks/useComboboxOptionsBuilder';
import { HintWithState } from '@/types/state.types';

type Props = {
  hint: HintWithState;
};

export function LayoutHint({ hint }: Props) {
  // !HOOKS
  const { buildOptions } = useComboboxOptionsBuilder();

  // !OPTIONS
  const itemOptions = buildOptions(hint.comboboxOptions?.item ?? []);
  const locationOptions = buildOptions(hint.comboboxOptions?.location ?? []);

  return (
    <div data-name="layout-hint">
      <p className="font-semibold">{hint.name}</p>
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
