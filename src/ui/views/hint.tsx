import { cn } from '@/lib/utils';
import { type HintInput } from '@/types/hint.types';
import { useAtom, type PrimitiveAtom } from 'jotai';

type HintInputProps = {
  atom: PrimitiveAtom<string>;
  placeholder?: string;
};

function HintInput({ atom, placeholder }: HintInputProps) {
  const [item, setItem] = useAtom(atom);
  return <input type="text" placeholder={placeholder} value={item} onChange={(e) => setItem(e.target.value)} />;
}

type Props = {
  hint: HintInput;
};

export function Hint({ hint }: Props) {
  const [checked, setChecked] = useAtom(hint.checked);

  return (
    <div className={cn(checked && 'bg-green-900')} onClick={() => setChecked(!checked)}>
      <p className="text-md">{hint.name}</p>
      {hint.type !== 'location' && hint.item && <HintInput atom={hint.item} placeholder="What?" />}
      {hint.type !== 'item' && hint.location && <HintInput atom={hint.location} placeholder="Where?" />}
    </div>
  );
}
