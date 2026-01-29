import z from 'zod';

export const EmptyStringSchema = z.string().default('');

export const HintTypeSchema = z.enum(['item', 'location', 'item-location']);
export type HintType = z.infer<typeof HintTypeSchema>;

export const PresetHintSchema = z.object({
  name: z.string(),
  type: HintTypeSchema,
  color: z.string().optional(),
});
export type PresetHint = z.infer<typeof PresetHintSchema>;

export const PresetHintContainerSchema = z.object({
  name: z.string().optional(),
  type: HintTypeSchema,
  color: z.string().optional(),
  hints: z.array(z.union([z.string(), PresetHintSchema])).nonempty(),
});

export const PresetSectionSchema = z.object({
  header: z.string().optional(),
  lineColor: z.string().optional(),
  content: z.array(PresetHintContainerSchema).nonempty(),
});
export type PresetSection = z.infer<typeof PresetSectionSchema>;

export const PresetSchema = z.object({
  schemaVersion: z.number(),
  id: z.uuidv4(),
  name: z.string(),
  description: EmptyStringSchema,
  layout: z.array(PresetSectionSchema).nonempty(),
});
export type Preset = z.infer<typeof PresetSchema>;
