import z from 'zod';

export const EmptyStringSchema = z.string().default('');
export const ColSpanSchema = z.number().min(1).optional();

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
  colSpan: ColSpanSchema,
});
export type PresetHintCollection = z.infer<typeof PresetHintCollectionSchema>;

export const PresetHintPanelSchema = z.object({
  header: z.string().optional(),
  lineColor: z.string().optional(),
  colSpan: ColSpanSchema,
  get content() {
    const contentTypeSchema = z.union([
      PresetGridSchema,
      PresetHintCollectionSchema,
      PresetHintSchema,
    ]);
    return z.union([contentTypeSchema, z.array(contentTypeSchema).nonempty()]);
  },
});
export type PresetHintPanel = z.infer<typeof PresetHintPanelSchema>;

export const PresetGridSchema = z.object({
  numColumns: z.number().min(1),
  colSpan: ColSpanSchema,
  get columns() {
    const columnTypesSchema = z.union([
      PresetGridSchema,
      PresetHintPanelSchema,
      PresetHintCollectionSchema,
      PresetHintSchema,
    ]);

    return z.array(columnTypesSchema).nonempty();
  },
});

export const PresetSchema = z.object({
  schemaVersion: z.number(),
  id: z.uuidv4(),
  name: z.string(),
  description: EmptyStringSchema,
  layout: PresetGridSchema,
});
export type Preset = z.infer<typeof PresetSchema>;
