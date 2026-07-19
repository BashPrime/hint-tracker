import { cn } from '@/lib/utils';
import { LayoutStateGrid } from '@/types/state.types';
import './grid.css';
import { LayoutParser } from './parser';

type RowProps = {
  row: any[];
};

function LayoutRow({ row }: RowProps) {
  return (
    <div className="layout-grid-row flex flex-row" data-name="layout-grid-row">
      {row.map((col) => (
        <LayoutParser
          elem={col}
          key={col.type === 'hint' ? col.code : col.id}
        />
      ))}
    </div>
  );
}

type Props = {
  grid: LayoutStateGrid;
};

export function LayoutGrid({ grid }: Props) {
  return (
    <div
      className={cn(
        'layout-grid flex flex-col',
        grid.content.find((row) =>
          row.find((col) => col.type === 'unhinted')
        ) && 'min-h-0',
        grid.grow && 'h-full'
      )}
      data-name="layout-grid"
      key={grid.id}
      style={{
        gap: grid.gap ? `calc(var(--spacing) * ${grid.gap})` : undefined,
      }}
    >
      {grid.content.map((row, rowIdx) => (
        <LayoutRow row={row} key={`${grid.id}-${rowIdx}`} />
      ))}
    </div>
  );
}
