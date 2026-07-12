import {
  HintWithState,
  HintWithStateSchema,
  LayoutStateArray,
  LayoutStateArraySchema,
  LayoutStateGrid,
  LayoutStateGridSchema,
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
import { v4 as uuidv4 } from 'uuid';

function buildHintState(
  hint: LayoutHint,
  optionKeys?: ComboboxOptionKeys
): HintWithState {
  return HintWithStateSchema.parse({
    type: 'hint',
    code: hint.code,
    name: hint.name,
    image: hint.image,
    color: hint.color,
    comboboxOptions: optionKeys ?? hint.comboboxOptions,
    item: hint.hintType !== 'location' ? atom('') : null,
    location: hint.hintType !== 'item' ? atom('') : null,
    checked: atom(false),
  });
}

function processArray(arr: LayoutArray): LayoutStateArray {
  return LayoutStateArraySchema.parse({
    type: 'array',
    id: uuidv4(),
    header: arr.header,
    color: arr.color,
    borderColor: arr.borderColor,
    content: arr.content.map((c) => processElement(c, arr.comboboxOptions)),
  });
}

function processGrid(grid: LayoutGrid): LayoutStateGrid {
  return LayoutStateGridSchema.parse({
    type: 'grid',
    id: uuidv4(),
    header: grid.header,
    color: grid.color,
    borderColor: grid.borderColor,
    content: grid.content.map((row) =>
      row.map((col) => processElement(col, grid.comboboxOptions))
    ),
  });
}

function processElement(
  elem: LayoutObject,
  optionKeys?: ComboboxOptionKeys
): any {
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
      return parsed.success ? buildHintState(parsed.data, optionKeys) : {};
    default:
      return null;
  }
}

export function buildLayoutState(layout: LayoutRoot): LayoutStateRoot {
  return layout.content.map((c) => processElement(c));
}
