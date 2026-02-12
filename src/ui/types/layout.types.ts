import { PrimitiveAtom } from 'jotai';
import { EmptyStringSchema } from 'src/shared/types/base.types';
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
  grow: z.boolean().default(false),
});
export type Hint = z.infer<typeof HintSchema>;

// export const HintCollectionSchema = z.object({
//   hints: z.array(HintSchema).nonempty(),
//   color: z.string().optional(),
//   numColumns: NumColumnsSchema.optional(),
//   grow: z.boolean().default(false),
// });
// export type HintCollection = z.infer<typeof HintCollectionSchema>;

export const HintCollectionSchema = z.object({
  get hints() {
    return z.array(z.union([HintSchema, z.array(HintSchema)]));
  },
  color: z.string().optional(),
  numColumns: NumColumnsSchema.optional(),
  grow: z.boolean().default(false),
  colSpan: ColSpanSchema,
});
export type HintCollection = z.infer<typeof HintCollectionSchema>;

export const HintPanelContentTypeSchema = z.union([
  HintCollectionSchema,
  HintSchema,
]);
export type HintPanelContentType = z.infer<typeof HintPanelContentTypeSchema>;

export const HintPanelSchema = z.object({
  content: z.union([
    HintPanelContentTypeSchema,
    z.array(HintPanelContentTypeSchema).nonempty(),
  ]),
  header: z.string().optional(),
  lineColor: z.string().optional(),
  numColumns: NumColumnsSchema.optional(),
  colSpan: ColSpanSchema,
});
export type HintPanel = z.infer<typeof HintPanelSchema>;

export const ColumnSchema = z.union([
  HintPanelSchema,
  HintCollectionSchema,
  HintSchema,
]);
export type Column = z.infer<typeof ColumnSchema>;

export const GridSchema = z.object({
  columns: z.array(ColumnSchema).nonempty(),
  numColumns: NumColumnsSchema,
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
