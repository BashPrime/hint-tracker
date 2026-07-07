import {
  HintWithStateSchema,
  LayoutStateArraySchema,
  LayoutStateGridSchema,
  LayoutStateObject,
} from '@/types/state.types';
import { LayoutArray } from './array';
import { LayoutGrid } from './grid';
import { LayoutHint } from './hint';

type BodyProps = {
  elem: LayoutStateObject;
};

function ParserBody({ elem }: BodyProps) {
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

type Props = {
  elem: LayoutStateObject;
};

export function LayoutParser({ elem }: Props) {
  if (elem.header) {
    return (
      <div className="flex flex-col gap-2 bg-black" data-name="layout-group">
        <p className="text-xl font-bold uppercase">{elem.header}</p>
        <ParserBody elem={elem} />
      </div>
    );
  }

  return <ParserBody elem={elem} />;
}
