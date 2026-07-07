import { LayoutObject as LayoutGroupType } from 'src/shared/types/layout.types';
import { LayoutElement } from './element';

type Props = {
  group: LayoutGroupType;
};

export function LayoutGroup({ group }: Props) {
  return (
    <div className="flex flex-col gap-2 bg-black" data-name="layout-group">
      {group.header && (
        <p className="text-xl font-bold uppercase">{group.header}</p>
      )}
      <LayoutElement elem={group} />
    </div>
  );
}
