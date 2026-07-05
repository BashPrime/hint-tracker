import { PrimitiveAtom } from 'jotai';
import {
  AutofillsSchema,
  LayoutGroupSchema
} from 'src/shared/types/layout.types';
import z from 'zod';

const HintStrAtomSchema: z.ZodType<PrimitiveAtom<string>> = z.any();
const HintBoolAtomSchema: z.ZodType<PrimitiveAtom<boolean>> = z.any();

export const HintWithStateSchema = z.object({
  name: z.string(),
  color: z.string().optional(),
  autofills: AutofillsSchema.optional(),
  item: HintStrAtomSchema.nullable(),
  location: HintStrAtomSchema.nullable(),
  checked: HintBoolAtomSchema,
});
export type HintWithState = z.infer<typeof HintWithStateSchema>;

export const LayoutStateRootSchema = z.array(LayoutGroupSchema);
export type LayoutStateRoot = z.infer<typeof LayoutStateRootSchema>;
