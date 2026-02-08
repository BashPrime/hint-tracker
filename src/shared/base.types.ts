import z from 'zod';

export const EmptyStringSchema = z.string().default('');

export const BaseElementSchema = z.object({
  id: z.uuid(),
  name: EmptyStringSchema,
});

export const HintTypeSchema = z.enum(['item', 'location', 'item-location']);
export type HintType = z.infer<typeof HintTypeSchema>;

export const ThemeSchema = z.enum(['system', 'light', 'dark']);
export type ThemeType = z.infer<typeof ThemeSchema>;
