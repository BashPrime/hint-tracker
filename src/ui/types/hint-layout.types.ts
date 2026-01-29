import { PrimitiveAtom } from 'jotai';
import z from 'zod';
import { EmptyStringSchema } from './base.types';

const HintStrAtomSchema: z.ZodType<PrimitiveAtom<string>> = z.any();
const HintBoolAtomSchema: z.ZodType<PrimitiveAtom<boolean>> = z.any();

export const HintSchema = z.object({
  name: z.string(),
  color: z.string().optional(),
  item: HintStrAtomSchema.nullable(),
  location: HintStrAtomSchema.nullable(),
  checked: HintBoolAtomSchema,
});
export type Hint = z.infer<typeof HintSchema>;

export const HintContainerSchema = z.object({
  name: z.string().optional(),
  color: z.string().optional(),
  hints: z.array(HintSchema).nonempty(),
});
export type HintContainer = z.infer<typeof HintContainerSchema>;

export const HintSectionSchema = z.object({
  header: z.string().optional(),
  lineColor: z.string().optional(),
  content: z.array(HintContainerSchema).nonempty(),
});
export type HintSection = z.infer<typeof HintSectionSchema>;

export const HintLayoutSchema = z.object({
  schemaVersion: z.number(),
  id: z.uuidv4(),
  name: z.string(),
  description: EmptyStringSchema,
  layout: z.array(HintSectionSchema).nonempty(),
});
export type HintLayout = z.infer<typeof HintLayoutSchema>;
