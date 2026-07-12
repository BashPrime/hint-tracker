import {
  HintWithState,
  LayoutStateGrid,
  LayoutStateObject,
  LayoutStateRoot,
} from '@/types/state.types';
import { atom } from 'jotai';
import { TrackerSaveState } from 'src/shared/types/config.types';
import { BasicPack, PackDetails } from 'src/shared/types/pack.types';

export const packsState = atom<BasicPack[] | null>(null);
export const activePackState = atom<PackDetails | null>(null);
export const layoutState = atom<LayoutStateRoot | null>(null);

export const trackerSaveFormatted = atom((get) => {
  // !STATE
  const layout = get(layoutState);
  const trackerSaveState: TrackerSaveState = {};

  // !FUNCTION
  function processObject(layoutStateObj: LayoutStateObject): any {
    switch (layoutStateObj.type) {
      case 'hint':
        const hint = layoutStateObj as HintWithState;
        trackerSaveState[hint.code] = {
          item: hint.item ? get(hint.item) : null,
          location: hint.location ? get(hint.location) : null,
          checked: get(hint.checked),
        };
        return;
      case 'grid':
        const grid = layoutStateObj as LayoutStateGrid;
        return grid.content.map((row) => row.map(processObject));
      default:
        return layoutStateObj.content.map((obj) => processObject(obj));
    }
  }

  if (!layout) {
    return null;
  }

  // build save state and return
  layout.map(processObject);
  return trackerSaveState;
});
