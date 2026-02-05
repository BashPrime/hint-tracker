import { cn } from '@/lib/utils';
import { activeHintLayoutState } from '@/states/App.states';
import { useAtomValue } from 'jotai';
import { Column } from './column';

export function Layout() {
  const layout = useAtomValue(activeHintLayoutState)?.layout;

  if (!layout) {
    return null;
  }

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${layout.numColumns}, minmax(0, 1fr))`,
      }}
      className={cn(
        layout.numColumns && layout.numColumns > 1 ? 'md:h-full' : null,
        'flex flex-col md:grid gap-2'
      )}
      data-name="layout-root"
    >
      {layout.columns.map((column, idx) => (
        <Column key={`column-${idx}`} column={column} />
      ))}
    </div>
  );
}
