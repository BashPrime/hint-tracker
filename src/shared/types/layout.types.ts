import z from 'zod';

export const ComboboxOptionKeySchema = z.enum([
  'items',
  'locations',
  'regions',
  'features:item',
  'features:location',
]);
export type ComboboxOptionKey = z.infer<typeof ComboboxOptionKeySchema>;

export const ComboboxOptionKeysSchema = z.object({
  item: z.array(ComboboxOptionKeySchema).optional(),
  location: z.array(ComboboxOptionKeySchema).optional(),
});
export type ComboboxOptionKeys = z.infer<typeof ComboboxOptionKeysSchema>;

export const LayoutObjectSchema = z.object({
  header: z.string().optional(),
  color: z.string().optional(),
  borderColor: z.string().optional(),
  grow: z.boolean().optional(),
  gap: z.number().optional(),
  comboboxOptions: ComboboxOptionKeysSchema.optional(),
  type: z.string(),
  // !WHY having a hard time getting the union types to work, so using any for now
  content: z.array(z.any()),
});
export type LayoutObject = z.infer<typeof LayoutObjectSchema>;

export const LayoutGroupSchema = LayoutObjectSchema.extend({
  type: z.literal('group'),
  header: z.string(),
});
export type LayoutGroup = z.infer<typeof LayoutGroupSchema>;

export const LayoutGridSchema = LayoutObjectSchema.extend({
  type: z.literal('grid'),
  // !WHY having a hard time getting the union types to work, so using any for now
  content: z.array(z.array(z.any())),
});
export type LayoutGrid = z.infer<typeof LayoutGridSchema>;

export const LayoutArraySchema = LayoutObjectSchema.extend({
  type: z.literal('array'),
});
export type LayoutArray = z.infer<typeof LayoutArraySchema>;

export const LayoutHintSchema = LayoutObjectSchema.omit({
  content: true,
  header: true,
}).extend({
  type: z.literal('hint'),
  name: z.string(),
  code: z.string(),
  image: z.string().optional(),
  hintType: z.enum(['item', 'location', 'itemAndLocation']),
  color: z.string().optional(),
  comboboxOptions: ComboboxOptionKeysSchema.optional(),
});
export type LayoutHint = z.infer<typeof LayoutHintSchema>;

export const LayoutUnhintedItemsSchema = LayoutObjectSchema.omit({
  content: true,
}).extend({
  type: z.literal('unhinted'),
});
export type LayoutUnhintedItems = z.infer<typeof LayoutUnhintedItemsSchema>;

export const LayoutPointerSchema = z.object({
  key: z.string(),
  type: z.literal('pointer'),
});
export type LayoutPointer = z.infer<typeof LayoutPointerSchema>;

export const UnprocessedLayoutRootSchema = z.object({
  type: z.literal('root'),
  content: z.array(LayoutPointerSchema),
});
export type UnprocessedLayoutRoot = z.infer<typeof UnprocessedLayoutRootSchema>;

export const LayoutRootSchema = z.object({
  type: z.literal('root'),
  content: z.array(LayoutObjectSchema),
});
export type LayoutRoot = z.infer<typeof LayoutRootSchema>;
