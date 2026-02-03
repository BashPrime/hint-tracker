import z from 'zod';

export const EmptyStringSchema = z.string().default('');

export const HintTypeSchema = z.enum(['item', 'location', 'item-location']);
export type HintType = z.infer<typeof HintTypeSchema>;

export const PresetHintSchema = z.object({
  name: z.string(),
  type: HintTypeSchema,
  color: z.string().optional(),
});
export type PresetHint = z.infer<typeof PresetHintSchema>;

export const PresetHintCollectionSchema = z.object({
  name: z.string().optional(),
  type: HintTypeSchema,
  color: z.string().optional(),
  hints: z.array(z.union([z.string(), PresetHintSchema])).nonempty(),
});
export type PresetHintCollection = z.infer<typeof PresetHintCollectionSchema>;

export const PresetPanelSchema = z.object({
  header: z.string().optional(),
  lineColor: z.string().optional(),
  colSpan: z.number().min(1).optional(),
  get content() {
    return z
      .array(
        z.union([
          PresetGridSchema,
          PresetHintCollectionSchema,
          PresetHintSchema,
        ])
      )
      .nonempty();
  },
});
export type PresetPanel = z.infer<typeof PresetPanelSchema>;

export const PresetColumnSchema = z.object({
  colSpan: z.number().min(1).optional(),
  get content() {
    const contentTypeSchema = z.union([
      PresetGridSchema,
      PresetPanelSchema,
      PresetHintCollectionSchema,
      PresetHintSchema,
    ]);
    return z.union([contentTypeSchema, z.array(contentTypeSchema).nonempty()]);
  },
});
export type PresetColumn = z.infer<typeof PresetColumnSchema>;

export const PresetGridSchema = z.object({
  numColumns: z.number().min(1),
  columns: z.array(PresetColumnSchema).nonempty(),
});

export const PresetSchema = z.object({
  schemaVersion: z.number(),
  id: z.uuidv4(),
  name: z.string(),
  description: EmptyStringSchema,
  layout: PresetGridSchema,
});
export type Preset = z.infer<typeof PresetSchema>;
