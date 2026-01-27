import { cn } from '@/lib/utils';
import type { HintInput } from '@/types/hint.types';
import { useAtomValue, type PrimitiveAtom } from 'jotai';
import { Hint } from './hint';

type Props = {
  header: string;
  atom: PrimitiveAtom<HintInput[]>
};

export function HintPanel({ header, atom }: Props) {
  const hints = useAtomValue(atom)

  return (
    <div className={cn('bg-gray-700')}>
      <h1 className="text-md font-semibold border-red-400 border-b-2">{header.toUpperCase()}</h1>
      {hints.map((hint, idx) => (
        <Hint key={`key-${idx}`} hint={hint} />
      ))}
    </div>
  );
}
