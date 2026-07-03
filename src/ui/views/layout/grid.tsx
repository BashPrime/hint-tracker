import {
  LayoutGrid as LayoutGridType,
  LayoutHintSchema,
} from 'src/shared/types/layout.types';
import { LayoutHint } from './hint';

type RowProps = {
  row: any[];
};

function LayoutRow({ row }: RowProps) {
  return (
    <div>
      {row.map((col, colIdx) => (
        <>
          {col.type === 'hint' && (
            <LayoutHint
              hint={LayoutHintSchema.parse(col)}
              autofills={col.autofills}
              key={`col-${colIdx}`}
            />
          )}
        </>
      ))}
    </div>
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
