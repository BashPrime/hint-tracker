import { PrimitiveAtom } from 'jotai';
import { EmptyStringSchema } from 'src/shared/base.types';
import z from 'zod';

export const ColSpanSchema = z.number().min(1).optional();
export const NumColumnsSchema = z.number().min(1);

const HintStrAtomSchema: z.ZodType<PrimitiveAtom<string>> = z.any();
const HintBoolAtomSchema: z.ZodType<PrimitiveAtom<boolean>> = z.any();

export const HintSchema = z.object({
  name: z.string(),
  color: z.string().optional(),
  item: HintStrAtomSchema.nullable(),
  location: HintStrAtomSchema.nullable(),
  checked: HintBoolAtomSchema,
  colSpan: ColSpanSchema,
});
export type Hint = z.infer<typeof HintSchema>;

export const HintCollectionSchema = z.object({
  name: z.string().optional(),
  color: z.string().optional(),
  hints: z.array(HintSchema).nonempty(),
  numColumns: NumColumnsSchema.optional(),
  colSpan: ColSpanSchema,
});
export type HintCollection = z.infer<typeof HintCollectionSchema>;

export const HintPanelSchema = z.object({
  header: z.string().optional(),
  lineColor: z.string().optional(),
  numColumns: NumColumnsSchema.optional(),
  colSpan: ColSpanSchema,
  content: z.union([
    HintCollectionSchema,
    HintSchema,
    z.array(z.union([HintCollectionSchema, HintSchema])).nonempty(),
  ]),
});
export type HintPanel = z.infer<typeof HintPanelSchema>;

export const ColumnSchema = z.union([
  HintPanelSchema,
  HintCollectionSchema,
  HintSchema,
]);
export type Column = z.infer<typeof ColumnSchema>;

export const GridSchema = z.object({
  numColumns: NumColumnsSchema,
  colSpan: ColSpanSchema,
  columns: z.array(ColumnSchema).nonempty(),
});
export type Grid = z.infer<typeof GridSchema>;

export const LayoutSchema = z.object({
  schemaVersion: z.number(),
  id: z.uuidv4(),
  name: z.string(),
  description: EmptyStringSchema,
  layout: GridSchema,
});
export type Layout = z.infer<typeof LayoutSchema>;
