import { isDev } from '@/helpers/utils';
import {
  HintWithState,
  LayoutStateGrid,
  LayoutStateObject,
  LayoutStateRoot,
  UnhintedItemHint,
} from '@/types/state.types';
import { atom } from 'jotai';
import {
  TrackerSaveState,
  TrackerState,
} from '../../shared/types/config.types';
import { BasicPack, PackDetails } from '../../shared/types/pack.types';

export const packsState = atom<BasicPack[] | null>(null);
export const activePackState = atom<PackDetails | null>(null);
export const layoutState = atom<LayoutStateRoot | null>(null);
export const pauseAutosaveState = atom<boolean>(false);
export const unhintedHintsState = atom<UnhintedItemHint[]>([]);
export const importTrackerState = atom<TrackerSaveState | null>(null);
export const trackerStateToLoad = atom<'autosave' | 'import'>('autosave');
export const showDevtoolsState = atom<boolean>(isDev());
// !WHY it's an arbitrary limit, but most players likely won't be using that many unhinted items
// also, putting it in an atom makes it easy to configure later :)
export const unhintedItemsLimitAtom = atom<number>(50);

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

export const trackerSaveFormattedState = atom<TrackerState>((get) => {
  // !STATE
  const hints = get(trackerHintsAtom);
  const unhintedHints = get(unhintedHintsState);
  const trackerSaveState: TrackerState = {};

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
