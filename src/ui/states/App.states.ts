import {
  HintWithStateSchema,
  LayoutStateObject,
  LayoutStateRoot,
} from '@/types/state.types';
import { atom } from 'jotai';
import { BasicPack, PackDetails } from 'src/shared/types/pack.types';

export const packsState = atom<BasicPack[] | null>(null);
export const activePackState = atom<PackDetails | null>(null);
export const layoutState = atom<LayoutStateRoot | null>(null);

export const trackerSaveFormatted = atom((get) => {
  // !STATE
  const layout = get(layoutState);
  const finalState: any = {};

  // !FUNCTION
  function processObject(layoutStateObj: LayoutStateObject): any {
    switch (layoutStateObj.type) {
      case 'hint':
        const hint = HintWithStateSchema.parse(layoutStateObj);
        finalState[hint.name] = {
          item: hint.item ? get(hint.item) : null,
          location: hint.location ? get(hint.location) : null,
          checked: get(hint.checked),
        };
        return;
      case 'grid':
        return layoutStateObj.content.map((row) => row.map(processObject));
      default:
        return layoutStateObj.content.map((obj) => processObject(obj));
    }
  }

  if (!layout) {
    return null;
  }

  layout.map(processObject);
  return finalState;
});
