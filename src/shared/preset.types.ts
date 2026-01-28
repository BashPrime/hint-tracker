import z from 'zod';
import { HintTypeSchema } from './base.types';

export const PresetBaseHintSchema = z.object({
  name: z.string(),
  type: HintTypeSchema,
});
export type PresetBaseHint = z.infer<typeof PresetBaseHintSchema>;

export const PresetHintCollectionSchema = z.object({
  ...PresetBaseHintSchema.shape,
  header: z.string().optional(),
  lineColor: z.string().optional(),
  type: z.literal('hint-collection'),
  hints: z.array(PresetBaseHintSchema),
});
export type PresetHintCollection = z.infer<typeof PresetHintCollectionSchema>;

export const PresetHintSchema = z.object({
  ...PresetBaseHintSchema.shape,
  lineColor: PresetHintCollectionSchema.shape.lineColor,
  hints: PresetHintCollectionSchema.optional(),
});
export type PresetHint = z.infer<typeof PresetHintSchema>;

export const PresetSchema = z.object({
  schemaVersion: z.number(),
  name: z.string(),
  layout: z.array(PresetHintSchema),
});
