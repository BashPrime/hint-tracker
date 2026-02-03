import z from 'zod';

export const EmptyStringSchema = z.string().default('');
export const ColSpanSchema = z.number().min(1).optional();
export const NumColumnsSchema = z.number().min(1);

export const HintTypeSchema = z.enum(['item', 'location', 'item-location']);
export type HintType = z.infer<typeof HintTypeSchema>;

export const PresetHintSchema = z.object({
  name: z.string(),
  type: HintTypeSchema,
  color: z.string().optional(),
  colSpan: ColSpanSchema,
});
export type PresetHint = z.infer<typeof PresetHintSchema>;

export const PresetHintCollectionSchema = z.object({
  name: z.string().optional(),
  type: HintTypeSchema,
  color: z.string().optional(),
  hints: z.array(z.union([z.string(), PresetHintSchema])).nonempty(),
  numColumns: NumColumnsSchema.optional(),
  colSpan: ColSpanSchema,
});
export type PresetHintCollection = z.infer<typeof PresetHintCollectionSchema>;

export const PresetHintPanelSchema = z.object({
  header: z.string().optional(),
  lineColor: z.string().optional(),
  numColumns: NumColumnsSchema.optional(),
  colSpan: ColSpanSchema,
  content: z.union([
    PresetHintCollectionSchema,
    PresetHintSchema,
    z.array(z.union([PresetHintCollectionSchema, PresetHintSchema])).nonempty(),
  ]),
});
export type PresetHintPanel = z.infer<typeof PresetHintPanelSchema>;

export const PresetColumnSchema = z.union([
  PresetHintPanelSchema,
  PresetHintCollectionSchema,
  PresetHintSchema,
]);
export type PresetColumn = z.infer<typeof PresetColumnSchema>;

export const PresetGridSchema = z.object({
  numColumns: NumColumnsSchema,
  colSpan: ColSpanSchema,
  columns: z.array(PresetColumnSchema).nonempty(),
});
export type PresetGrid = z.infer<typeof PresetGridSchema>;

export const PresetSchema = z.object({
  schemaVersion: z.number(),
  id: z.uuidv4(),
  name: z.string(),
  description: EmptyStringSchema,
  layout: PresetGridSchema,
});
export type Preset = z.infer<typeof PresetSchema>;
