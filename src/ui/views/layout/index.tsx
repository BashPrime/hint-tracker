import { cn } from '@/lib/utils';
import { activeHintLayoutState } from '@/states/App.states';
import { useAtomValue } from 'jotai';
import { useMediaQuery } from 'usehooks-ts';
import { Column } from './column';

export function Layout() {
  // !STATE
  const layout = useAtomValue(activeHintLayoutState)?.layout;

  // !HOOKS
  const matches = useMediaQuery('(min-width: 64rem)');

  if (!layout) {
    return null;
  }

  return (
    <div
      style={{
        gridTemplateColumns: matches && layout.numColumns > 3
          ? `repeat(${layout.numColumns}, minmax(0, 1fr))`
          : undefined,
      }}
      className={cn(
        'h-full grid grid-cols-1 gap-2',
        'overflow-none',
        layout.numColumns >= 2 && 'sm:grid-cols-2',
        layout.numColumns >= 3 && 'md:grid-cols-3',
      )}
      data-name="layout-root"
    >
      {layout.columns.map((column, idx) => (
        <Column key={`column-${idx}`} column={column} />
      ))}
    </div>
  );
}
