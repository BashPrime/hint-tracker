import { cn } from '@/lib/utils';
import { LayoutStateArray } from '@/types/state.types';
import { Header } from './header';
import { LayoutParser } from './parser';

type Props = {
  array: LayoutStateArray;
};

export function LayoutArray({ array }: Props) {
  if (!array.header) {
    return (
      <div
        className={cn(
          'shadow-md dark:shadow-none',
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

  // ! WHY
  // If a header is defined, use the previously-existing group component formatting
  // This is mainly so there's no gap between the header and the rest of the content LOL
  return (
    <div
      className={cn(
        'shadow-md dark:shadow-none',
        'flex flex-col',
        array.content.find((c) => c.type === 'unhinted') &&
          'sm:min-h-0',
        array.grow && 'h-full',
        'layout-array-group'
      )}
      data-name="layout-array-group"
      style={{
        borderLeft: array.borderColor
          ? `2px solid ${array.borderColor}`
          : undefined,
      }}
    >
      {array.header && <Header>{array.header}</Header>}
      <div
        className={cn(
          'flex flex-col',
          array.content.find((c) => c.type === 'unhinted') && 'sm:min-h-0',
          array.grow && 'h-full'
        )}
        style={{
          gap: array.gap ? `calc(var(--spacing) * ${array.gap})` : undefined,
        }}
        data-name="array-group-content"
      >
        {array.content.map((elem) => (
          <LayoutParser
            elem={elem}
            key={elem.type === 'hint' ? elem.code : elem.id}
          />
        ))}
      </div>
    </div>
  );
}
