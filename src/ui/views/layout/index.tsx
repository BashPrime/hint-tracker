import { cn } from '@/lib/utils';
import { activeHintLayoutState } from '@/states/App.states';
import { useAtomValue } from 'jotai';
import { GRID_BREAKPOINTS } from 'src/shared/constants';
import { Column } from './column';

export function Layout() {
  // !STATE
  const layout = useAtomValue(activeHintLayoutState)?.layout;

  if (!layout) {
    return null;
  }

  return (
    <div
      style={{
        gridTemplateColumns: layout.numColumns > 1
          ? `repeat(${layout.numColumns}, minmax(0, 1fr))`
          : 'unset',
      }}
      className={cn(
        'h-full',
        'flex flex-col gap-2',
        GRID_BREAKPOINTS[layout.gridBreakpoint]
      )}
      data-name="layout-root"
    >
      {layout.columns.map((column, idx) => (
        <Column key={`column-${idx}`} column={column} />
      ))}
    </div>
  );
}
