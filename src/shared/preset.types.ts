import z from 'zod';

export const EmptyStringSchema = z.string().default('');

export const HintTypeSchema = z.enum(['item', 'location', 'item-location']);
export type HintType = z.infer<typeof HintTypeSchema>;

export const PresetBaseHintSchema = z.object({
  name: z.string(),
  type: HintTypeSchema,
});
export type PresetBaseHint = z.infer<typeof PresetBaseHintSchema>;

export const PresetHintSchema = z.object({
  ...PresetBaseHintSchema.shape,
  name: z.string().optional(),
  color: z.string().optional(),
  group: z.array(z.union([z.string(), PresetBaseHintSchema])).optional(),
});
export type PresetHint = z.infer<typeof PresetHintSchema>;

export const PresetSectionSchema = z.object({
  header: z.string().optional(),
  lineColor: z.string().optional(),
  hints: z.array(PresetHintSchema),
});
export type PresetSection = z.infer<typeof PresetSectionSchema>;

export const PresetSchema = z.object({
  schemaVersion: z.number(),
  id: z.uuidv4(),
  name: z.string(),
  description: EmptyStringSchema,
  layout: z.array(PresetSectionSchema),
});
export type Preset = z.infer<typeof PresetSchema>;
