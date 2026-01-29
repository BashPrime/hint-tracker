import { AtomCombobox } from '@/components/atom-combobox';
import { cn } from '@/lib/utils';
import { Hint as HintType } from '@/types/hint-layout.types';

type Props = {
  hint: HintType;
};

export function Hint({ hint }: Props) {
  return (
    <div className="border border-black">
      <p className={cn(hint.color && `text-${hint.color}`)}>{hint.name}</p>
      {hint.item && <AtomCombobox atom={hint.item} placeholder={"What?"} items={['Dark Beam']} />}
      {hint.location && <AtomCombobox atom={hint.location} placeholder={"Where?"} items={['Torvus Energy Controller']} />}
    </div>
  );
}
