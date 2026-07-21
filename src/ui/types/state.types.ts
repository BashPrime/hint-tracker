import { PrimitiveAtom } from 'jotai';
import { ComboboxOptionKeysSchema } from 'src/shared/types/layout.types';
import z from 'zod';

const HintStrAtomSchema: z.ZodType<PrimitiveAtom<string>> = z.any();
const HintBoolAtomSchema: z.ZodType<PrimitiveAtom<boolean>> = z.any();

export const LayoutStateObjectSchema = z.object({
  header: z.string().optional(),
  id: z.uuidv4(),
  type: z.string(),
  content: z.array(z.any()),
  // Styling
  color: z.string().optional(),
  borderColor: z.string().optional(),
  grow: z.boolean().optional(),
  gap: z.number().optional(),
  // Hint stuff
  name: z.string().optional(),
  code: z.string().optional(),
  item: HintStrAtomSchema.nullish(),
  location: HintStrAtomSchema.nullish(),
  checked: HintBoolAtomSchema.optional(),
  // Invalid state object
  err: z.instanceof(z.ZodError).optional(),
});
export type LayoutStateObject = z.infer<typeof LayoutStateObjectSchema>;

export const LayoutStateGroupShema = LayoutStateObjectSchema.omit({
  name: true,
  code: true,
  item: true,
  location: true,
  checked: true,
}).extend({
  type: z.literal('group'),
});
export type LayoutStateGroup = z.infer<typeof LayoutStateGroupShema>;

export const HintWithStateSchema = LayoutStateObjectSchema.omit({
  id: true,
  content: true,
  header: true,
  grow: true,
}).extend({
  type: z.literal('hint'),
  name: z.string(),
  code: z.string(),
  image: z.string().optional(),
  comboboxOptions: ComboboxOptionKeysSchema.optional(),
  item: HintStrAtomSchema.nullable(),
  location: HintStrAtomSchema.nullable(),
  checked: HintBoolAtomSchema,
});
export type HintWithState = z.infer<typeof HintWithStateSchema>;

export const LayoutStateArraySchema = LayoutStateObjectSchema.extend({
  type: z.literal('array'),
});
export type LayoutStateArray = z.infer<typeof LayoutStateArraySchema>;

export const LayoutStateGridSchema = LayoutStateObjectSchema.extend({
  type: z.literal('grid'),
  content: z.array(z.array(z.any())),
});
export type LayoutStateGrid = z.infer<typeof LayoutStateGridSchema>;

export const UnhintedItemHintSchema = HintWithStateSchema.extend({
  name: z.literal('').default(''),
  type: z.literal('hint').default('hint'),
  item: HintStrAtomSchema,
  location: HintStrAtomSchema,
});
export type UnhintedItemHint = z.infer<typeof UnhintedItemHintSchema>;

export const LayoutStateUnhintedItemsSchema = LayoutStateObjectSchema.omit({
  name: true,
  content: true,
  code: true,
  item: true,
  location: true,
  checked: true,
  grow: true,
}).extend({
  type: z.literal('unhinted'),
  comboboxOptions: ComboboxOptionKeysSchema.optional(),
});
export type LayoutStateUnhintedItems = z.infer<
  typeof LayoutStateUnhintedItemsSchema
>;

export const LayoutStateRootSchema = z.array(LayoutStateObjectSchema);
export type LayoutStateRoot = z.infer<typeof LayoutStateRootSchema>;

export const InvalidStateObjectSchema = z.object({
  id: z.uuidv4(),
  type: z.literal('invalid'),
  err: z.instanceof(z.ZodError),
});
export type InvalidStateObject = z.infer<typeof InvalidStateObjectSchema>;
