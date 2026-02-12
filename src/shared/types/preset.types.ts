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
  grow: z.boolean().default(false),
});
export type PresetHint = z.infer<typeof PresetHintSchema>;

export const PresetHintCollectionHintTypeSchema = z.union([
  z.string(),
  PresetHintSchema,
]);
export type PresetHintCollectionHintType = z.infer<
  typeof PresetHintCollectionHintTypeSchema
>;

export const PresetHintCollectionSchema = z.object({
  hints: z
    .array(
      z.union([
        PresetHintCollectionHintTypeSchema,
        z.array(PresetHintCollectionHintTypeSchema),
      ])
    )
    .nonempty(),
  type: HintTypeSchema,
  color: z.string().optional(),
  numColumns: NumColumnsSchema.optional(),
  grow: z.boolean().default(false),
  colSpan: ColSpanSchema,
});
export type PresetHintCollection = z.infer<typeof PresetHintCollectionSchema>;

export const PresetHintPanelContentTypeSchema = z.union([
  PresetHintCollectionSchema,
  PresetHintSchema,
]);

export const PresetHintPanelSchema = z.object({
  content: z.union([
    PresetHintPanelContentTypeSchema,
    z.array(z.union([PresetHintPanelContentTypeSchema])).nonempty(),
  ]),
  header: z.string().optional(),
  lineColor: z.string().optional(),
  numColumns: NumColumnsSchema.optional(),
  colSpan: ColSpanSchema,
});
export type PresetHintPanel = z.infer<typeof PresetHintPanelSchema>;

export const PresetColumnSchema = z.union([
  PresetHintPanelSchema,
  PresetHintCollectionSchema,
  PresetHintSchema,
]);
export type PresetColumn = z.infer<typeof PresetColumnSchema>;

export const PresetGridSchema = z.object({
  columns: z.array(PresetColumnSchema).nonempty(),
  numColumns: NumColumnsSchema,
});
export type PresetGrid = z.infer<typeof PresetGridSchema>;

export const PresetSchema = z.object({
  schemaVersion: z.number(),
  id: z.uuidv4(),
  name: z.string(),
  description: EmptyStringSchema,
  gameId: z.uuidv4(),
  layout: PresetGridSchema,
});
export type Preset = z.infer<typeof PresetSchema>;
