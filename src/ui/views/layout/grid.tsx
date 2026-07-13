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
      className="layout-grid flex flex-col"
      data-name="layout-grid"
      key={grid.id}
    >
      {grid.content.map((row, rowIdx) => (
        <LayoutRow row={row} key={`${grid.id}-${rowIdx}`} />
      ))}
    </div>
  );
}
