import { cn } from '@/lib/utils';
import { LayoutStateGroup } from '@/types/state.types';
import { Header } from './header';
import { LayoutParser } from './parser';

type Props = {
  group: LayoutStateGroup;
};

export function LayoutGroup({ group }: Props) {
  return (
    <div
      className={cn(
        'shadow-md dark:shadow-none',
        'flex flex-col',
        group.content.find((c) => c.type === 'unhinted') && 'min-h-0 flex-none',
        group.grow && 'h-full',
        'layout-group'
      )}
      data-name="layout-group"
      style={{
        borderLeft: group.borderColor
          ? `2px solid ${group.borderColor}`
          : undefined,
      }}
    >
      {group.header && <Header>{group.header}</Header>}
      <div
        className={cn(
          'flex flex-col',
          group.content.find((c) => c.type === 'unhinted') && 'min-h-0',
          group.grow && 'h-full'
        )}
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
