import { LayoutStateArray } from '@/types/state.types';
import { LayoutParser } from './parser';

type Props = {
  array: LayoutStateArray;
};

export function LayoutArray({ array }: Props) {
  return (
    <div className="flex flex-col h-full" data-name="layout-array" key={array.id}>
      {array.content.map((elem) => (
        <LayoutParser elem={elem} key={elem.type === 'hint' ? elem.code : elem.id} />
      ))}
    </div>
  );
}
