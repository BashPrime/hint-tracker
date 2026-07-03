import { LayoutGrid as LayoutGridType } from 'src/shared/types/layout.types';
import { LayoutElement } from './element';

type RowProps = {
  row: any[];
};

function LayoutRow({ row }: RowProps) {
  return (
    <>
      {row.map((col, colIdx) => (
        <LayoutElement elem={col} key={`grid-col-${colIdx}`} />
      ))}
    </>
  );
}

type Props = {
  grid: LayoutGridType;
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
