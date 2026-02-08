import { useLayout } from '@/hooks/useLayout';
import { cn } from '@/lib/utils';
import { Column } from '@/views/layout/column';
import { createFileRoute } from '@tanstack/react-router';
import { useMediaQuery } from 'usehooks-ts';

export const Route = createFileRoute('/layouts/$layoutId')({
  component: Layout,
});

function Layout() {
  // !HOOKS
  const layout = useLayout(Route.useParams().layoutId);
  const matches = useMediaQuery('(min-width: 64rem)');

  if (!layout) {
    return null;
  }

  return (
    <div
      style={{
        gridTemplateColumns:
          matches && layout.numColumns > 3
            ? `repeat(${layout.numColumns}, minmax(0, 1fr))`
            : undefined,
      }}
      className={cn(
        'grid h-full grid-cols-1 gap-2',
        'overflow-none',
        layout.numColumns >= 2 && 'sm:grid-cols-2',
        layout.numColumns >= 3 && 'md:grid-cols-3'
      )}
      data-name="layout-root"
    >
      {layout.columns.map((column, idx) => (
        <Column key={`column-${idx}`} column={column} />
      ))}
    </div>
  );
}
