import {
  HintWithState,
  HintWithStateSchema,
  InvalidStateObjectSchema,
  LayoutStateArray,
  LayoutStateArraySchema,
  LayoutStateGrid,
  LayoutStateGridSchema,
  LayoutStateRoot,
  LayoutStateUnhintedItemsSchema,
  UnhintedItemHint,
  UnhintedItemHintSchema,
} from '@/types/state.types';
import { atom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import z from 'zod';
import { TrackerSaveState } from '../../shared/types/config.types';
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
  LayoutUnhintedItems,
  LayoutUnhintedItemsSchema,
} from '../../shared/types/layout.types';

function buildHintState(
  hint: LayoutHint,
  optionKeys?: ComboboxOptionKeys,
  saveState?: TrackerSaveState
): HintWithState {
  const match = saveState ? saveState.state[hint.code] : null;

  return HintWithStateSchema.parse({
    type: 'hint',
    code: hint.code,
    name: hint.name,
    image: hint.image,
    color: hint.color,
    borderColor: hint.borderColor,
    comboboxOptions: optionKeys ?? hint.comboboxOptions,
    item: hint.hintType !== 'location' ? atom(match?.item ?? '') : null,
    location: hint.hintType !== 'item' ? atom(match?.location ?? '') : null,
    checked: atom(match?.checked ?? false),
  });
}

function processArray(
  arr: LayoutArray,
  saveState?: TrackerSaveState
): LayoutStateArray {
  return LayoutStateArraySchema.parse({
    type: 'array',
    id: uuidv4(),
    header: arr.header,
    color: arr.color,
    borderColor: arr.borderColor,
    grow: arr.grow,
    gap: arr.gap,
    content: arr.content.map((c) =>
      processElement(c, saveState, arr.comboboxOptions)
    ),
  });
}

function processGrid(
  grid: LayoutGrid,
  saveState?: TrackerSaveState
): LayoutStateGrid {
  return LayoutStateGridSchema.parse({
    type: 'grid',
    id: uuidv4(),
    color: grid.color,
    borderColor: grid.borderColor,
    grow: grid.grow,
    gap: grid.gap,
    content: grid.content.map((row) =>
      row.map((col) => processElement(col, saveState, grid.comboboxOptions))
    ),
  });
}

function processUnhinted(unhinted: LayoutUnhintedItems) {
  return LayoutStateUnhintedItemsSchema.parse({
    id: uuidv4(),
    type: 'unhinted',
    header: unhinted.header,
    color: unhinted.color,
    borderColor: unhinted.borderColor,
    comboboxOptions: unhinted.comboboxOptions,
  });
}

function buildInvalidObject(err: z.ZodError) {
  return InvalidStateObjectSchema.parse({
    id: uuidv4(),
    type: 'invalid',
    err,
  });
}

function processElement(
  elem: LayoutObject,
  saveState?: TrackerSaveState,
  optionKeys?: ComboboxOptionKeys
): any {
  let parsed;

  switch (elem.type) {
    case 'array':
      parsed = LayoutArraySchema.safeParse(elem);
      return parsed.success
        ? processArray(parsed.data, saveState)
        : buildInvalidObject(parsed.error);
    case 'grid':
      parsed = LayoutGridSchema.safeParse(elem);
      return parsed.success
        ? processGrid(parsed.data, saveState)
        : buildInvalidObject(parsed.error);
    case 'unhinted':
      parsed = LayoutUnhintedItemsSchema.safeParse(elem);
      return parsed.success
        ? processUnhinted(parsed.data)
        : buildInvalidObject(parsed.error);
    case 'hint':
      parsed = LayoutHintSchema.safeParse(elem);
      return parsed.success
        ? buildHintState(parsed.data, optionKeys, saveState)
        : buildInvalidObject(parsed.error);
    default:
      return buildInvalidObject(
        new z.ZodError([
          {
            code: 'custom',
            path: ['type'],
            params: {
              value: elem.type ?? '',
            },
            message: 'Unable to determine what type this object is',
          },
        ])
      );
  }
}

export function buildLayoutState(
  layout: LayoutRoot,
  saveState?: TrackerSaveState
): LayoutStateRoot {
  return layout.content.map((c) => processElement(c, saveState));
}

export function buildUnhintedState(
  saveState?: TrackerSaveState,
  limit?: number
): UnhintedItemHint[] {
  const unhinted = saveState
    ? Object.entries(saveState.state).filter(([key]) =>
        key.includes('unhinted')
      )
    : [];

  const parsed = unhinted.map(([key, val]) =>
    UnhintedItemHintSchema.parse({
      code: key,
      item: atom(val.item ?? ''),
      location: atom(val.location ?? ''),
      checked: atom(val.checked ?? false),
    })
  );

  if (limit) {
    return parsed.slice(0, limit);
  }

  return parsed;
}
