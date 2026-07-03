import {
  LayoutArraySchema,
  LayoutGridSchema,
  LayoutGroup as LayoutGroupType,
  LayoutHintSchema,
} from 'src/shared/types/layout.types';
import { LayoutArray } from './array';
import { LayoutGrid } from './grid';
import { LayoutHint } from './hint';

type Props = {
  group: LayoutGroupType;
};

export function LayoutGroup({ group }: Props) {
  return (
    <div className="flex flex-col gap-2 bg-black" data-name="layout-group">
      {group.header && (
        <p className="text-xl font-bold uppercase">{group.header}</p>
      )}
      {group.type === 'array' && (
        <LayoutArray array={LayoutArraySchema.parse(group)} />
      )}
      {group.type === 'grid' && (
        <LayoutGrid grid={LayoutGridSchema.parse(group)} />
      )}
      {group.type === 'hint' && (
        <LayoutHint hint={LayoutHintSchema.parse(group)} />
      )}
    </div>
  );
}
