import { atom, PrimitiveAtom } from 'jotai';
import z from 'zod';
import { PresetHintSchema, PresetSchema } from '../../shared/preset.types';

const HintStrAtomSchema: z.ZodType<PrimitiveAtom<string>> = z.any();
const HintBoolAtomSchema: z.ZodType<PrimitiveAtom<boolean>> = z.any();

export const BaseHintSchema = z.object({
  name: z.string(),
  item: HintStrAtomSchema.nullable(),
  location: HintStrAtomSchema.nullable(),
  checked: HintBoolAtomSchema,
});
export type BaseHint = z.infer<typeof BaseHintSchema>;

export const HintSchema = z.object({
  ...BaseHintSchema.shape,
  color: z.string().optional(),
});
export type Hint = z.infer<typeof HintSchema>;

export const HintWithGroupSchema = z.object({
  ...BaseHintSchema.shape,
  name: BaseHintSchema.shape.name.optional(),
  color: HintSchema.shape.color,
  group: z.array(BaseHintSchema),
});
export type HintWithGroup = z.infer<typeof HintWithGroupSchema>;

export const PresetToHintSchema = PresetHintSchema.transform((presetHint) => {
  // This is a hint group, so we parse it as one.
  if (presetHint.group) {
    const parsedGroup = presetHint.group.map((groupHint) => {
      let hint;
      switch (typeof groupHint) {
        case 'string':
          hint = {
            ...presetHint,
            name: groupHint,
          };
          break;
        case 'object':
          hint = groupHint;
          break;
      }

      return BaseHintSchema.parse({
        name: hint.name,
        item: hint.type !== 'location' ? atom('') : null,
        location: hint.type !== 'item' ? atom('') : null,
        checked: atom(false),
      });
    });

    return HintWithGroupSchema.parse({
      ...presetHint,
      group: parsedGroup,
    });
  }

  // No group field, so this is a regular hint
  return HintSchema.parse({
    ...presetHint,
    item: presetHint.type !== 'location' ? atom('') : null,
    location: presetHint.type !== 'item' ? atom('') : null,
    checked: atom(false),
  });
});

export const HintSectionSchema = z.object({
  header: z.string().optional(),
  lineColor: z.string().optional(),
  hints: z.array(PresetToHintSchema),
});
export type HintSection = z.infer<typeof HintSectionSchema>;

export const HintLayoutSchema = z.object({
  ...PresetSchema.shape,
  layout: z.array(HintSectionSchema),
});
export type HintLayout = z.infer<typeof HintLayoutSchema>;
