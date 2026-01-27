import z from 'zod';

export const EmptyStringSchema = z.string().default('');

export const BaseElementSchema = z.object({
  id: z.uuid(),
  name: EmptyStringSchema,
});
export type BaseElement = z.infer<typeof BaseElementSchema>;

export const ItemTypeSchema = z.enum(['progression', 'useful', 'filler']);

export const ItemSchema = z.object({
  ...BaseElementSchema.shape,
  type: ItemTypeSchema,
});
export type Item = z.infer<typeof ItemSchema>;

export const LocationSchema = BaseElementSchema;
export type Location = z.infer<typeof LocationSchema>;
