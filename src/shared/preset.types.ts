import z from 'zod';
import { HintTypeSchema } from './base.types';

export const PresetBaseHintSchema = z.object({
  name: z.string(),
  type: HintTypeSchema,
});
export type PresetBaseHint = z.infer<typeof PresetBaseHintSchema>;

export const PresetHintSchema = z.object({
  ...PresetBaseHintSchema.shape,
  type: z.string().optional()
})
export type PresetHint = z.infer<typeof PresetHintSchema>;

export const PresetHintGroupSchema = z.object({
  ...PresetBaseHintSchema.shape,
  nameColor: z.string().optional(),
  hints: z.array(PresetBaseHintSchema),
});
export type PresetHintGroup = z.infer<typeof PresetHintGroupSchema>;

export const PresetSectionSchema = z.object({
  header: z.string().optional(),
  lineColor: z.string().optional(),
  hintGroups: z.array(PresetHintGroupSchema),
})

export const PresetSchema = z.object({
  schemaVersion: z.number(),
  name: z.string(),
  layout: z.array(PresetSectionSchema),
});
