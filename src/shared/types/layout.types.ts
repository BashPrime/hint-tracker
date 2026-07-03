import z from 'zod';

export const LayoutGroupSchema = z.object({
  header: z.string().optional(),
  color: z.string().optional(),
  borderColor: z.string().optional(),
  autofills: z
    .object({
      item: z.array(z.string()).optional(),
      location: z.array(z.string()).optional(),
    })
    .optional(),
  type: z.string(),
  content: z.array(z.any()),
});
export type LayoutGroup = z.infer<typeof LayoutGroupSchema>;

export const LayoutGridSchema = LayoutGroupSchema.extend({
  type: z.literal('grid'),
  content: z.array(z.array(z.any())),
});
export type LayoutGrid = z.infer<typeof LayoutGridSchema>;

export const LayoutArraySchema = LayoutGroupSchema.extend({
  type: z.literal('array'),
  content: z.array(z.any()),
});
export type LayoutArray = z.infer<typeof LayoutArraySchema>;

export const LayoutHintSchema = z.object({
  type: z.literal('hint'),
  name: z.string(),
  hintType: z.enum(['item', 'location', 'itemAndLocation']),
  color: z.string().optional(),
  autofills: z
    .object({
      item: z.array(z.string()).optional(),
      location: z.array(z.string()).optional(),
    })
    .optional(),
});
export type LayoutHint = z.infer<typeof LayoutHintSchema>;

export const LayoutPointerSchema = z.object({
  key: z.string(),
  type: z.literal('pointer'),
});
export type LayoutPointer = z.infer<typeof LayoutPointerSchema>;

export const LayoutRootSchema = z.object({
  type: z.literal('root'),
  content: z.array(LayoutPointerSchema),
});
export type LayoutRoot = z.infer<typeof LayoutRootSchema>;
