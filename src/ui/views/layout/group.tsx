import { LayoutStateObject } from '@/types/state.types';
import { LayoutParser } from './parser';

type Props = {
  group: LayoutStateObject;
};

export function LayoutGroup({ group }: Props) {
  return (
    <div className="flex flex-col gap-2 bg-black" data-name="layout-group">
      {group.header && (
        <p className="text-xl font-bold uppercase">{group.header}</p>
      )}
      <LayoutParser elem={group} />
    </div>
  );
}
