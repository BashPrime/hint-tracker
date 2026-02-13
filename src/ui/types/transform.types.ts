import { atom } from 'jotai';
import {
  GameDataItem,
  GameDataLocation,
  GameDataSchema,
} from 'src/shared/types/game.types';
import {
  PresetGridSchema,
  PresetHintCollectionHintType,
  PresetHintCollectionSchema,
  PresetHintPanelSchema,
  PresetHintSchema,
  PresetSchema,
} from '../../shared/types/preset.types';
import {
  GridSchema,
  HintCollectionSchema,
  HintPanelSchema,
  HintSchema,
  LayoutSchema,
} from './layout.types';

export const GameDataOptionsTransformSchema = GameDataSchema.transform(
  (data) => {
    function itemMap(item: GameDataItem) {
      return item.name;
    }

    function locationMap(location: GameDataLocation) {
      return location.name;
    }
    
    return {
      items: data.items.filter((item) => item.type !== 'feature').map(itemMap),
      progression: data.items
        .filter((item) => item.type === 'progression')
        .map(itemMap),
      useful: data.items.filter((item) => item.type === 'useful').map(itemMap),
      filler: data.items.filter((item) => item.type === 'filler').map(itemMap),
      itemFeatures: data.items
        .filter((item) => item.type === 'feature')
        .map(itemMap),
      locations: data.locations
        .filter((location) => location.type !== 'feature')
        .map(locationMap),
      regions: data.locations
        .map((location) => location.region)
        .filter((region, idx, self) => region && idx === self.indexOf(region)),
      locationFeatures: data.locations
        .filter((location) => location.type === 'feature')
        .map(locationMap),
    };
  }
);

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
    function parseHint(hint: PresetHintCollectionHintType) {
      let hintToParse;
      switch (typeof hint) {
        // If the hint is a string literal, apply the hint type from the container.
        case 'string':
          hintToParse = {
            name: hint,
            options: collection.options,
            type: collection.type,
            color: collection.color,
          };
          break;
        // If the hint is an object, its properties override the container's.
        case 'object':
          hintToParse = hint;
          break;
      }
      return HintTransformSchema.parse(hintToParse);
    }

    const parsedHints = collection.hints.map((hintsElem) => {
      // collection can have nested arrays!
      if (Array.isArray(hintsElem)) {
        return hintsElem.map((hint) => parseHint(hint));
      }

      return parseHint(hintsElem);
    });

    return HintCollectionSchema.parse({
      ...collection,
      hints: parsedHints,
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
