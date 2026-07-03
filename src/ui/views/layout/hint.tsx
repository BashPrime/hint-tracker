import {
  Autofills,
  LayoutHint as LayoutHintType,
} from 'src/shared/types/layout.types';

type Props = {
  hint: LayoutHintType;
  autofills?: Autofills;
};

export function LayoutHint({ hint, autofills }: Props) {
  return (
    <div data-name="layout-hint">
      <p className="font-semibold">{hint.name}</p>
      {hint.hintType !== 'location' && <p>Item</p>}
      {hint.hintType !== 'item' && <p>Location</p>}
    </div>
  );
}
