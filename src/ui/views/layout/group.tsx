import { cn } from '@/lib/utils';
import { LayoutStateGroup } from '@/types/state.types';
import { LayoutParser } from './parser';

type Props = {
  group: LayoutStateGroup;
};

export function LayoutGroup({ group }: Props) {
  return (
    <div
      className={cn('shadow-md dark:shadow-none', 'flex flex-col', 'layout-group')}
      data-name="layout-group"
      style={{
        borderLeft: group.borderColor
          ? `2px solid ${group.borderColor}`
          : undefined,
      }}
    >
      {group.header && (
        <p
          className={cn(
            'dark:text-foreground bg-neutral-700 text-neutral-50 dark:bg-neutral-900',
            'px-2 py-1',
            'text-base font-bold uppercase select-none'
          )}
        >
          {group.header}
        </p>
      )}
      <div
        className={cn('flex flex-col', group.grow && 'h-full')}
        style={{
          gap: group.gap ? `calc(var(--spacing) * ${group.gap})` : undefined,
        }}
        data-name="group-content"
      >
        {group.content.map((elem) => (
          <LayoutParser
            elem={elem}
            key={elem.type === 'hint' ? elem.code : elem.id}
          />
        ))}
      </div>
    </div>
  );
}
