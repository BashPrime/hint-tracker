import { PrimitiveAtom } from 'jotai';
import { ComboboxOptionKeysSchema } from 'src/shared/types/layout.types';
import z from 'zod';

const HintStrAtomSchema: z.ZodType<PrimitiveAtom<string>> = z.any();
const HintBoolAtomSchema: z.ZodType<PrimitiveAtom<boolean>> = z.any();

export const HintWithStateSchema = z.object({
  type: z.literal('hint'),
  name: z.string(),
  color: z.string().optional(),
  comboboxOptions: ComboboxOptionKeysSchema.optional(),
  item: HintStrAtomSchema.nullable(),
  location: HintStrAtomSchema.nullable(),
  checked: HintBoolAtomSchema,
});
export type HintWithState = z.infer<typeof HintWithStateSchema>;

export const LayoutStateObjectSchema = z.object({
  header: z.string().optional(),
  color: z.string().optional(),
  borderColor: z.string().optional(),
  type: z.string(),
  content: z.array(z.any()),
});
export type LayoutStateObject = z.infer<typeof LayoutStateObjectSchema>;

export const LayoutStateArraySchema = LayoutStateObjectSchema.extend({
  type: z.literal('array'),
});
export type LayoutStateArray = z.infer<typeof LayoutStateArraySchema>;

export const LayoutStateGridSchema = LayoutStateObjectSchema.extend({
  type: z.literal('grid'),
  content: z.array(z.array(z.any())),
});
export type LayoutStateGrid = z.infer<typeof LayoutStateGridSchema>;

export const LayoutStateRootSchema = z.array(LayoutStateObjectSchema);
export type LayoutStateRoot = z.infer<typeof LayoutStateRootSchema>;
