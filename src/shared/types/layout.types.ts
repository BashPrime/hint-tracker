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
  comboboxOptions: ComboboxOptionKeysSchema.optional(),
  type: z.string(),
  get content() {
    return z.array(LayoutContentUnionSchema);
  },
});
export type LayoutObject = z.infer<typeof LayoutObjectSchema>;

export const LayoutGridSchema = LayoutObjectSchema.extend({
  type: z.literal('grid'),
  get content() {
    return z.array(z.array(LayoutContentUnionSchema));
  },
});
export type LayoutGrid = z.infer<typeof LayoutGridSchema>;

export const LayoutArraySchema = LayoutObjectSchema.extend({
  type: z.literal('array'),
});
export type LayoutArray = z.infer<typeof LayoutArraySchema>;

export const LayoutHintSchema = z.object({
  type: z.literal('hint'),
  name: z.string(),
  hintType: z.enum(['item', 'location', 'itemAndLocation']),
  color: z.string().optional(),
  comboboxOptions: ComboboxOptionKeysSchema.optional(),
});
export type LayoutHint = z.infer<typeof LayoutHintSchema>;

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

export const LayoutContentUnionSchema = z.union([
  LayoutHintSchema,
  LayoutArraySchema,
  LayoutGridSchema,
]);
