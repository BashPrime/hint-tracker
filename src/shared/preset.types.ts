import z from 'zod';
import { EmptyStringSchema, HintTypeSchema } from './base.types';

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

export const PresetSchema = z.object({
  schemaVersion: z.number(),
  id: z.uuidv4(),
  name: z.string(),
  description: EmptyStringSchema,
  layout: z.array(PresetSectionSchema),
});
