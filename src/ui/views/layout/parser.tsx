import { cn } from '@/lib/utils';
import {
  LayoutStateArray,
  LayoutStateGrid,
  LayoutStateObject,
} from '@/types/state.types';
import { LayoutArray } from './array';
import { LayoutGrid } from './grid';
import { LayoutHint } from './hint';
import './parser.css';

type BodyProps = {
  elem: LayoutStateObject;
};

function ParserBody({ elem }: BodyProps) {
  return (
    <>
      {elem.type === 'array' && (
        <LayoutArray array={elem as LayoutStateArray} />
      )}
      {elem.type === 'grid' && <LayoutGrid grid={elem as LayoutStateGrid} />}
      {elem.type === 'hint' && <LayoutHint hint={elem as any} />}
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
          'flex h-full flex-1 flex-col',
          'layout-group'
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
            'text-base font-bold uppercase select-none'
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
