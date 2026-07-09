import { LayoutStateArray } from '@/types/state.types';
import { LayoutParser } from './parser';

type Props = {
  array: LayoutStateArray;
};

export function LayoutArray({ array }: Props) {
  return (
    <div className="flex flex-col h-full" data-name="layout-array">
      {array.content.map((elem, idx) => (
        <LayoutParser elem={elem} key={`array-${idx}`} />
      ))}
    </div>
  );
}
