import {
    HintWithState,
    HintWithStateSchema,
    LayoutStateRoot,
} from '@/types/state.types';
import { atom } from 'jotai';
import {
    ComboboxOptionKeys,
    LayoutArray,
    LayoutArraySchema,
    LayoutGrid,
    LayoutGridSchema,
    LayoutHint,
    LayoutHintSchema,
    LayoutObject,
    LayoutRoot,
} from 'src/shared/types/layout.types';
import { BasicPack, PackDetails } from 'src/shared/types/pack.types';

export const packsState = atom<BasicPack[] | null>(null);
export const activePackState = atom<PackDetails | null>(null);

function buildHintState(
  hint: LayoutHint,
  autofills?: ComboboxOptionKeys
): HintWithState | null {
  const parsed = HintWithStateSchema.safeParse({
    name: hint.name,
    color: hint.color,
    autofills: autofills ? autofills : hint.comboboxOptions,
    item: hint.hintType !== 'location' ? atom('') : null,
    location: hint.hintType !== 'item' ? atom('') : null,
    checked: atom(false),
  });

  return parsed.success ? parsed.data : null;
}

function processArray(arr: LayoutArray) {
  return arr.content.map((elem) => processElement(elem, arr.comboboxOptions));
}

function processGrid(grid: LayoutGrid) {
  return grid.content.map((row) =>
    row.map((col) => processElement(col, grid.comboboxOptions))
  );
}

function processElement(elem: LayoutObject, autofills?: ComboboxOptionKeys): any {
  let parsed;

  switch (elem.type) {
    case 'array':
      parsed = LayoutArraySchema.safeParse(elem);
      return parsed.success ? processArray(parsed.data) : [];
    case 'grid':
      parsed = LayoutGridSchema.safeParse(elem);
      return parsed.success ? processGrid(parsed.data) : [];
    case 'hint':
      parsed = LayoutHintSchema.safeParse(elem);
      return parsed.success ? buildHintState(parsed.data, autofills) : {};
    default:
      return null;
  }
}

export function buildLayoutState(layout: LayoutRoot): LayoutStateRoot {
  return layout.content.map((c) => processElement(c));
}
