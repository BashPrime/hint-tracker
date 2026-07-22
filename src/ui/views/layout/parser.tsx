import {
  HintWithState,
  InvalidStateObject,
  LayoutStateArray,
  LayoutStateGrid,
  LayoutStateObject,
  LayoutStateUnhintedItems,
} from '@/types/state.types';
import { LayoutArray } from './array';
import { LayoutGrid } from './grid';
import { LayoutHint } from './hint';
import { InvalidObject } from './invalid-object';
import { UnhintedItems } from './unhinted-items';

type Props = {
  elem: LayoutStateObject;
};

export function LayoutParser({ elem }: Props) {
  return (
    <>
      {elem.type === 'group' && (
        <LayoutArray array={elem as LayoutStateArray} />
      )}
      {elem.type === 'array' && (
        <LayoutArray array={elem as LayoutStateArray} />
      )}
      {elem.type === 'grid' && <LayoutGrid grid={elem as LayoutStateGrid} />}
      {elem.type === 'hint' && <LayoutHint hint={elem as HintWithState} />}
      {elem.type === 'unhinted' && (
        <UnhintedItems unhinted={elem as LayoutStateUnhintedItems} />
      )}
      {elem.type === 'invalid' && (
        <InvalidObject obj={elem as InvalidStateObject} />
      )}
    </>
  );
}
