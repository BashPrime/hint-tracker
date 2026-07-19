import { cn } from '@/lib/utils';
import { LayoutStateArray } from '@/types/state.types';
import { LayoutParser } from './parser';

type Props = {
  array: LayoutStateArray;
};

export function LayoutArray({ array }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col',
        array.content.find((c) => c.type === 'unhinted') && 'sm:min-h-0',
        array.grow && 'h-full'
      )}
      data-name="layout-array"
      key={array.id}
      style={{
        gap: array.gap ? `calc(var(--spacing) * ${array.gap})` : undefined,
      }}
    >
      {array.content.map((elem) => (
        <LayoutParser
          elem={elem}
          key={elem.type === 'hint' ? elem.code : elem.id}
        />
      ))}
    </div>
  );
}
