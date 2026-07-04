import { LayoutArray as LayoutArrayType } from 'src/shared/types/layout.types';
import { LayoutElement } from './element';

type Props = {
  array: LayoutArrayType;
};

export function LayoutArray({ array }: Props) {
  return (
    <>
      {array.content.map((elem, idx) => (
        <LayoutElement
          elem={elem}
          comboboxOptions={array.autofills}
          key={`array-${idx}`}
        />
      ))}
    </>
  );
}
