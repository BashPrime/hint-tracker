import z from 'zod';
import { SemVerSchema } from './base.types.js';

export const PackTrackerJsonSchema = z.object({
  schemaVersion: z.literal(1),
  version: SemVerSchema,
  id: z.string(),
  author: z.string(),
  name: z.string(),
  gameName: z.string(),
  description: z.string().optional(),
  cover: z.string().optional(),
  items: z.array(z.string()),
  locations: z.array(z.string()),
  features: z.array(z.string()),
});
export type PackTrackerJsonType = z.infer<typeof PackTrackerJsonSchema>;
