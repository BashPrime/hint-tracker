import { cn } from '@/lib/utils';
import { activeHintLayoutState } from '@/states/App.states';
import { useAtomValue } from 'jotai';
import { Column } from './column';

export function Layout() {
  // !STATE
  const layout = useAtomValue(activeHintLayoutState)?.layout;
  const gridBreakpointMapping = {
    sm: 'sm:grid',
    md: 'md:grid',
    lg: 'lg:grid',
    xl: 'xl:grid',
    '2xl': '2xl:grid',
  };

  if (!layout) {
    return null;
  }

  return (
    <div
      className={cn(
        'h-full',
        'flex flex-col gap-2',
        gridBreakpointMapping[layout.gridBreakpoint],
        layout.numColumns > 1 &&
          `grid-cols-[repeat(${layout.numColumns},minmax(0,1fr))]`
      )}
      data-name="layout-root"
    >
      {layout.columns.map((column, idx) => (
        <Column key={`column-${idx}`} column={column} />
      ))}
    </div>
  );
}
