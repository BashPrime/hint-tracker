import z from 'zod';

export const LayoutGroupSchema = z.object({
  header: z.string().optional(),
  borderColor: z.string().optional(),
  autofills: z.array(z.string()).optional(),
});

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

export const HintSchema = z.object({
  key: z.string(),
  type: z.enum(['item', 'location', 'itemAndLocation']),
  autofills: z.array(z.string()).optional(),
});
