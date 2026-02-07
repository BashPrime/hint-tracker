import { atom } from 'jotai';
import z from 'zod';
import {
  PresetGridSchema,
  PresetHintCollectionSchema,
  PresetHintPanelSchema,
  PresetHintSchema,
  PresetMultiHintCollectionSchema,
  PresetSchema,
} from '../../shared/preset.types';
import {
  GridSchema,
  HintCollectionSchema,
  HintPanelSchema,
  HintSchema,
  LayoutSchema,
  MultiHintCollectionSchema,
} from './layout.types';

export const HintTransformSchema = PresetHintSchema.transform((hint) => {
  return HintSchema.parse({
    ...hint,
    item: hint.type !== 'location' ? atom('') : null,
    location: hint.type !== 'item' ? atom('') : null,
    checked: atom(false),
  });
});

export const HintCollectionTransformSchema =
  PresetHintCollectionSchema.transform((collection) => {
    const parsedHints = collection.hints.map((hint) => {
      let hintToParse;
      switch (typeof hint) {
        // If the hint is a string literal, apply the hint type from the container.
        case 'string':
          hintToParse = {
            ...collection,
            name: hint,
          };
          break;
        // If the hint is an object, its properties override the container's.
        case 'object':
          hintToParse = hint;
          break;
      }
      return HintTransformSchema.parse(hintToParse);
    });

    return HintCollectionSchema.parse({
      ...collection,
      hints: parsedHints,
    });
  });

export const MultiHintCollectionTransformSchema =
  PresetMultiHintCollectionSchema.transform((multi) => {
    return MultiHintCollectionSchema.parse({
      ...multi,
      collections: z
        .array(HintCollectionTransformSchema)
        .parse(multi.collections),
    });
  });

const HintPanelTransformSchema = PresetHintPanelSchema.transform((panel) => {
  function parseContent(content: object) {
    const parsedCollection = HintCollectionTransformSchema.safeParse(content);
    const parsedHint = HintTransformSchema.safeParse(content);

    if (parsedHint.success) {
      return parsedHint.data;
    }

    if (parsedCollection.success) {
      return parsedCollection.data;
    }
  }
  return HintPanelSchema.parse({
    ...panel,
    content: PresetHintPanelSchema.shape.content
      .transform((content) => {
        if (Array.isArray(content)) {
          return content.map((contentItem) => parseContent(contentItem));
        }
        return parseContent(content);
      })
      .parse(panel.content),
  });
});

const GridTransformSchema = PresetGridSchema.transform((grid) => {
  return GridSchema.parse({
    numColumns: grid.numColumns,
    columns: PresetGridSchema.shape.columns
      .transform((columns) =>
        columns.map((column) => {
          const parsedHint = HintTransformSchema.safeParse(column);
          const parsedCollection =
            HintCollectionTransformSchema.safeParse(column);
          const parsedPanel = HintPanelTransformSchema.safeParse(column);

          if (parsedHint.success) {
            return parsedHint.data;
          }

          if (parsedCollection.success) {
            return parsedCollection.data;
          }

          if (parsedPanel.success) {
            return parsedPanel.data;
          }
        })
      )
      .parse(grid.columns),
  });
});

export const PresetToLayoutTransformSchema = PresetSchema.transform(
  (preset) => {
    return LayoutSchema.parse({
      ...preset,
      layout: GridTransformSchema.parse(preset.layout),
    });
  }
);
