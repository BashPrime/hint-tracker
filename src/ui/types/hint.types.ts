import type { PrimitiveAtom } from 'jotai';
import { BaseElementSchema, EmptyStringSchema } from 'src/shared/base.types';
import z from 'zod';

export const CheckedSchema = z.boolean().default(false);
export const HintTypeSchema = z.enum(['item', 'location', 'item-location']);

export const BaseHintSchema = z.object({
  ...BaseElementSchema.shape,
});
export type BaseHint = z.infer<typeof BaseHintSchema>;

export const BaseHintInputSchema = z.object({
  ...BaseHintSchema.shape,
  checked: CheckedSchema,
});
export type BaseHintInput = z.infer<typeof BaseHintInputSchema>;

export const ItemLocationHintSchema = z.object({
  ...BaseHintSchema.shape,
  type: z.literal('item-location'),
  item: EmptyStringSchema,
  location: EmptyStringSchema,
});
export type ItemLocationHint = z.infer<typeof ItemLocationHintSchema>;

export const ItemHintSchema = z.object({
  ...BaseHintSchema.shape,
  item: EmptyStringSchema,
});
export type ItemHint = z.infer<typeof ItemHintSchema>;

export const LocationHintSchema = z.object({
  ...BaseHintSchema.shape,
  location: EmptyStringSchema,
});
export type LocationHint = z.infer<typeof LocationHintSchema>;

export const HintInputTypeSchema = z.enum([
  'item',
  'location',
  'item-location',
]);
export type HintInputType = z.infer<typeof HintInputTypeSchema>;

const HintInputStrAtom: z.ZodType<PrimitiveAtom<string>> = z.any();
const HintInputBoolAtom: z.ZodType<PrimitiveAtom<boolean>> = z.any();

export const HintInputSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  type: HintInputTypeSchema,
  item: HintInputStrAtom.nullable(),
  location: HintInputStrAtom.nullable(),
  checked: HintInputBoolAtom,
});
export type HintInput = z.infer<typeof HintInputSchema>;

export const ItemHintInputSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  item: HintInputStrAtom,
  checked: HintInputBoolAtom,
});
export type ItemHintInput = z.infer<typeof ItemHintInputSchema>;

export const LocationHintInputSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  location: HintInputStrAtom,
  checked: HintInputBoolAtom,
});
export type LocationHintInput = z.infer<typeof LocationHintInputSchema>;

export const HintCollectionSchema = z.object({
  name: z.string(),
  header: z.string().nullable(),
  type: z.literal('hint-collection'),
  get hints() {
    return z.array(
      z.union([
        ItemHintSchema,
        LocationHintSchema,
        ItemLocationHintSchema,
        HintCollectionSchema,
      ])
    );
  },
});
export type HintCollection = z.infer<typeof HintCollectionSchema>;
