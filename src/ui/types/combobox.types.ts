import z from 'zod';

export const LocationWithRegionSchema = z.object({
  name: z.string(),
  region: z.string(),
  features: z.array(z.string()),
});
export type LocationWithRegion = z.infer<typeof LocationWithRegionSchema>;

export const ComboboxOptionsDbSchema = z.object({
  items: z.array(z.string()),
  locations: z.array(LocationWithRegionSchema),
  regions: z.array(z.string()),
  'features:item': z.array(z.string()),
  'features:location': z.array(z.string()),
});
export type ComboboxOptionsDb = z.infer<typeof ComboboxOptionsDbSchema>;
