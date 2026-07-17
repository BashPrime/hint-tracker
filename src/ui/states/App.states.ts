import {
  HintWithState,
  LayoutStateGrid,
  LayoutStateObject,
  LayoutStateRoot,
  UnhintedItemHint,
} from '@/types/state.types';
import { atom } from 'jotai';
import { TrackerSaveState } from 'src/shared/types/config.types';
import { BasicPack, PackDetails } from 'src/shared/types/pack.types';

export const packsState = atom<BasicPack[] | null>(null);
export const activePackState = atom<PackDetails | null>(null);
export const layoutState = atom<LayoutStateRoot | null>(null);
export const pauseAutosaveState = atom<boolean>(false);
export const unhintedHintsState = atom<UnhintedItemHint[]>([]);

export const trackerHintsAtom = atom((get) => {
  // !STATE
  const layout = get(layoutState);
  const hints: HintWithState[] = [];

  // !FUNCTION
  function processHint(hint: HintWithState): void {
    hints.push(hint);
  }

  function processObject(layoutStateObj: LayoutStateObject): void {
    switch (layoutStateObj.type) {
      case 'hint':
        processHint(layoutStateObj as HintWithState);
        break;
      case 'group':
      case 'array':
        layoutStateObj.content.map(processObject);
        break;
      case 'grid':
        const grid = layoutStateObj as LayoutStateGrid;
        grid.content.map((row) => row.map(processObject));
        break;
    }
  }

  if (!layout) {
    return null;
  }

  // build save state and return
  layout.map(processObject);
  return hints;
});

export const trackerSaveFormatted = atom((get) => {
  // !STATE
  const hints = get(trackerHintsAtom);
  const unhintedHints = get(unhintedHintsState);
  const trackerSaveState: TrackerSaveState = {};

  // !FUNCTION
  function parseHints(hints: HintWithState[] | null) {
    if (hints) {
      for (const hint of hints) {
        trackerSaveState[hint.code] = {
          item: hint.item ? get(hint.item) : null,
          location: hint.location ? get(hint.location) : null,
          checked: get(hint.checked),
        };
      }
    }
  }

  parseHints(hints);
  parseHints(unhintedHints);

  return trackerSaveState;
});
