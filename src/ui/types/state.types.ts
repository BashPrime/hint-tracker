import { PrimitiveAtom } from 'jotai';
import {
  ComboboxOptionKeysSchema,
  LayoutObjectSchema,
} from 'src/shared/types/layout.types';
import z from 'zod';

const HintStrAtomSchema: z.ZodType<PrimitiveAtom<string>> = z.any();
const HintBoolAtomSchema: z.ZodType<PrimitiveAtom<boolean>> = z.any();

export const HintWithStateSchema = z.object({
  name: z.string(),
  color: z.string().optional(),
  autofills: ComboboxOptionKeysSchema.optional(),
  item: HintStrAtomSchema.nullable(),
  location: HintStrAtomSchema.nullable(),
  checked: HintBoolAtomSchema,
});
export type HintWithState = z.infer<typeof HintWithStateSchema>;

export const LayoutStateObjectSchema = z.object({
  header: z.string().optional(),
  color: z.string().optional(),
  borderColor: z.string().optional(),
  comboBoxOptions: z.array(z.string()).optional(),
  type: z.string(),
  get content() {
    return z.array(LayoutStateObjectSchema);
  },
});
export type LayoutStateObject = z.infer<typeof LayoutStateObjectSchema>;

export const LayoutStateArraySchema = LayoutStateObjectSchema.extend({
  type: z.literal('array'),
});
export type LayoutStateArray = z.infer<typeof LayoutStateArraySchema>;

export const LayoutStateGridSchema = z.object({
  type: z.literal('grid'),
  get content() {
    return z.array(z.array(LayoutStateContentUnionSchema));
  },
});
export type LayoutStateGrid = z.infer<typeof LayoutStateGridSchema>;

export const LayoutStateRootSchema = z.array(LayoutObjectSchema);
export type LayoutStateRoot = z.infer<typeof LayoutStateRootSchema>;

export const LayoutStateContentUnionSchema = z.union([
  HintWithStateSchema,
  LayoutStateArraySchema,
  LayoutStateGridSchema,
]);
