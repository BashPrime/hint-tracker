import type { PrimitiveAtom } from 'jotai';
import z from 'zod';
import { EmptyStringSchema } from './tracker.types';

export const CheckedSchema = z.boolean().default(false);

export const BaseHintSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  checked: CheckedSchema,
});
export type BaseHint = z.infer<typeof BaseHintSchema>;

export const ItemLocationHintSchema = z.object({
  ...BaseHintSchema.shape,
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

export const HintInputTypeSchema = z.enum(['item', 'location', 'item-location']);
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
