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

export const SemVerSchema = z
  .string()
  .regex(
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
  );
export type SemVer = z.infer<typeof SemVerSchema>;
