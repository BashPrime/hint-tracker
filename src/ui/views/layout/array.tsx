import {
  LayoutArray as LayoutArrayType,
  LayoutHintSchema,
} from 'src/shared/types/layout.types';
import { LayoutGroup } from './group';
import { LayoutHint } from './hint';

type Props = {
  array: LayoutArrayType;
};

export function LayoutArray({ array }: Props) {
  return (
    <>
      {array.content.map((elem, idx) => (
        <div data-name="array-content" key={`array-${idx}`}>
          {elem.type === 'hint' && (
            <LayoutHint
              hint={LayoutHintSchema.parse(elem)}
              autofills={array.autofills}
            />
          )}
          {elem.type !== 'hint' && <LayoutGroup group={elem} />}
        </div>
      ))}
    </>
  );
}
