import { LayoutStateArray } from '@/types/state.types';
import { LayoutParser } from './parser';

type Props = {
  array: LayoutStateArray;
};

export function LayoutArray({ array }: Props) {
  return (
    <>
      {array.content.map((elem, idx) => (
        <LayoutParser elem={elem} key={`array-${idx}`} />
      ))}
    </>
  );
}
