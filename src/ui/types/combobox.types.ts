import z from 'zod';

export const ComboboxOptionSchema = z.object({
  group: z.string(),
  items: z.array(z.string()),
});
export type ComboboxOption = z.infer<typeof ComboboxOptionSchema>;

export const LocationWithRegionSchema = z.object({
  name: z.string(),
  region: z.string(),
  features: z.array(z.string()),
});
export type LocationWithRegion = z.infer<typeof LocationWithRegionSchema>;

export const ComboboxOptionsDbGroupRecordSchema = z.record(
  z.string(),
  z.array(z.string())
);
export type ComboboxOptionsDbGroupRecord = z.infer<
  typeof ComboboxOptionsDbGroupRecordSchema
>;

export const ComboboxOptionsDbSchema = z.object({
  items: ComboboxOptionsDbGroupRecordSchema,
  locations: ComboboxOptionsDbGroupRecordSchema,
  regions: ComboboxOptionsDbGroupRecordSchema,
  'features:item': ComboboxOptionsDbGroupRecordSchema,
  'features:location': ComboboxOptionsDbGroupRecordSchema,
});
export type ComboboxOptionsDb = z.infer<typeof ComboboxOptionsDbSchema>;
