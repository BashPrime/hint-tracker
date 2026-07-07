import { HintWithStateSchema, LayoutStateArraySchema, LayoutStateGridSchema, LayoutStateObject } from '@/types/state.types';
import {
  ComboboxOptionKeys
} from 'src/shared/types/layout.types';
import { LayoutArray } from './array';
import { LayoutGrid } from './grid';
import { LayoutHint } from './hint';

type Props = {
  elem: LayoutStateObject;
  comboboxOptions?: ComboboxOptionKeys;
};

export function LayoutParser({ elem }: Props) {
  return (
    <>
      {elem.type === 'array' && (
        <LayoutArray array={LayoutStateArraySchema.parse(elem)} />
      )}
      {elem.type === 'grid' && (
        <LayoutGrid grid={LayoutStateGridSchema.parse(elem)} />
      )}
      {elem.type === 'hint' && (
        <LayoutHint hint={HintWithStateSchema.parse(elem)} />
      )}
    </>
  );
}
