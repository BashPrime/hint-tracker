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
      className="grid"
    >
      {layout.columns.map((column, idx) => (
        <Column key={`column-${idx}`} column={column} />
      ))}
    </div>
  );
}
