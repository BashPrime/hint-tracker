import { cn } from '@/lib/utils';
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
      <div
        className={cn(
          'shadow-md dark:shadow-none',
          'bg-neutral-200/90 dark:bg-neutral-700/90',
          'flex flex-col'
        )}
        data-name="layout-group"
        style={{
          borderLeft: elem.borderColor
            ? `2px solid ${elem.borderColor}`
            : undefined,
        }}
      >
        <p
          className={cn(
            'dark:text-foreground bg-gray-600 text-neutral-50 dark:bg-neutral-900',
            'px-2 py-1',
            'text-lg font-bold uppercase select-none'
          )}
        >
          {elem.header}
        </p>
        <ParserBody elem={elem} />
      </div>
    );
  }

  return <ParserBody elem={elem} />;
}
