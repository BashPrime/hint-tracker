import { LayoutStateUnhintedItems } from '@/types/state.types';
import { LayoutHint } from './hint';

type Props = {
  unhinted: LayoutStateUnhintedItems;
};

export function UnhintedItems({ unhinted }: Props) {
  return (
    <div data-name="unhinted-items">
      {unhinted.content.map((hint) => (
        <LayoutHint hint={hint} key={hint.code} />
      ))}
    </div>
  );
}
