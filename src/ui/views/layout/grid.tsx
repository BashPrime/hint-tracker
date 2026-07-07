import { LayoutStateGrid } from '@/types/state.types';
import { LayoutParser } from './parser';

type RowProps = {
  row: any[];
};

function LayoutRow({ row }: RowProps) {
  return (
    <>
      {row.map((col, colIdx) => (
        <LayoutParser elem={col} key={`grid-col-${colIdx}`} />
      ))}
    </>
  );
}

type Props = {
  grid: LayoutStateGrid;
};

export function LayoutGrid({ grid }: Props) {
  return (
    <div className="flex flex-row" data-name="layout-grid">
      {grid.content.map((row, rowIdx) => (
        <LayoutRow row={row} key={`row-${rowIdx}`} />
      ))}
    </div>
  );
}
