import {
  LayoutArraySchema,
  LayoutGroup as LayoutGroupType
} from 'src/shared/types/layout.types';
import { LayoutArray } from './array';

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
        <LayoutArray group={LayoutArraySchema.parse(group)} />
      )}
      {group.type === 'grid' && (
        // <LayoutGrid grid={LayoutGridSchema.parse(group)} />
        <p>Grid</p>
      )}
    </div>
  );
}
