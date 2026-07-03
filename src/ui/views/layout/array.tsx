import {
  LayoutArray as LayoutArrayType,
  LayoutHintSchema,
} from 'src/shared/types/layout.types';
import { LayoutHint } from './hint';

type Props = {
  group: LayoutArrayType;
};

export function LayoutArray({ group }: Props) {
  return (
    <>
      {group.content.map((c) => (
        <>
          {c.type === 'hint' && (
            <LayoutHint
              hint={LayoutHintSchema.parse(c)}
              autofills={group.autofills}
            />
          )}
        </>
      ))}
    </>
  );
}
