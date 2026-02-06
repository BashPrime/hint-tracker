import z from 'zod';

export const EmptyStringSchema = z.string().default('');

export const BaseElementSchema = z.object({
  id: z.uuid(),
  name: EmptyStringSchema,
});

export const HintTypeSchema = z.enum(['item', 'location', 'item-location']);
export type HintType = z.infer<typeof HintTypeSchema>;

export const AppearanceModeSchema = z.enum(['system', 'light', 'dark']);
export type AppearanceMode = z.infer<typeof AppearanceModeSchema>;

export const GridBreakpointSchema = z.enum(['sm', 'md', 'lg', 'xl', '2xl']);
export type GridBreakpoint = z.infer<typeof GridBreakpointSchema>;
