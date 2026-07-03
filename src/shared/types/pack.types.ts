import z from 'zod';
import { SemVerSchema } from './base.types.js';
import { CoverSchema } from './cover.types.js';

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
  layout: z.array(z.string()),
});
export type PackTrackerJsonType = z.infer<typeof PackTrackerJsonSchema>;

export const BasicPackSchema = PackTrackerJsonSchema.extend({
  path: z.string(),
  cover: CoverSchema.nullable(),
});
export type BasicPack = z.infer<typeof BasicPackSchema>;

export const ItemSchema = z.object({
  name: z.string(),
  code: z.string(),
  type: z.enum(['progression', 'useful', 'filler']),
  features: z.array(z.string()),
});
export type Item = z.infer<typeof ItemSchema>;

export const LocationSchema = z.object({
  name: z.string(),
  features: z.array(z.string()),
});

export const LocationParentSchema = z.object({
  name: z.string(),
  children: z.array(LocationSchema),
});
export type LocationParent = z.infer<typeof LocationParentSchema>;

export const FeatureSchema = z.object({
  name: z.string(),
  code: z.string(),
  type: z.enum(['feature:item', 'feature:location']),
});
export type Feature = z.infer<typeof FeatureSchema>;

export const PackDetailsSchema = z.object({
  id: z.string(),
  items: z.array(ItemSchema),
  locations: z.array(LocationParentSchema),
  features: z.array(FeatureSchema),
});
export type PackDetails = z.infer<typeof PackDetailsSchema>;
