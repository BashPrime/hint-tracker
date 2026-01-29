import { atom } from 'jotai';
import z from 'zod';
import {
  PresetHintContainerSchema,
  PresetSchema,
  PresetSectionSchema,
} from '../../shared/preset.types';
import {
  HintContainerSchema,
  HintLayoutSchema,
  HintSchema,
  HintSectionSchema,
} from './hint-layout.types';

const PresetToLayoutHintContainerTransformSchema =
  PresetHintContainerSchema.transform((presetContainer) => {
    const parsedHints = presetContainer.hints.map((hint) => {
      let hintToParse;
      switch (typeof hint) {
        // If the hint is a string literal, apply the hint type from the container.
        case 'string':
          hintToParse = {
            ...presetContainer,
            name: hint,
          };
          break;
        // If the hint is an object, its properties override the container's.
        case 'object':
          hintToParse = hint;
          break;
      }
      return HintSchema.parse({
        name: hintToParse.name,
        color: hintToParse.color,
        item: hintToParse.type !== 'location' ? atom('') : null,
        location: hintToParse.type !== 'item' ? atom('') : null,
        checked: atom(false),
      });
    });

    return HintContainerSchema.parse({
      ...presetContainer,
      hints: parsedHints,
    });
  });

const PresetToLayoutHintSectionSchema = PresetSectionSchema.transform(
  (section) => {
    return HintSectionSchema.parse({
      ...section,
      content: z
        .array(PresetToLayoutHintContainerTransformSchema)
        .parse(section.content),
    });
  }
);

export const PresetToHintLayoutSchema = PresetSchema.transform((preset) => {
  return HintLayoutSchema.parse({
    ...preset,
    layout: z.array(PresetToLayoutHintSectionSchema).parse(preset.layout),
  });
});
