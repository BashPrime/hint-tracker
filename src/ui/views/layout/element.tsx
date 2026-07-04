import {
  LayoutArraySchema,
  LayoutGridSchema,
  LayoutGroup,
  LayoutHintSchema,
} from 'src/shared/types/layout.types';
import { LayoutArray } from './array';
import { LayoutGrid } from './grid';
import { LayoutHint } from './hint';

type Props = {
  elem: LayoutGroup;
};

export function LayoutElement({ elem }: Props) {
  return (
    <>
      {elem.type === 'array' && (
        <LayoutArray array={LayoutArraySchema.parse(elem)} />
      )}
      {elem.type === 'grid' && (
        <LayoutGrid grid={LayoutGridSchema.parse(elem)} />
      )}
      {elem.type === 'hint' && (
        <LayoutHint hint={LayoutHintSchema.parse(elem)} autofills={elem.autofills} />
      )}
    </>
  );
}
