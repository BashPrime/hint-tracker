import z from 'zod';

export const ImageTypeSchema = z.enum(['webp', 'png', 'jpeg']);
export type ImageType = z.infer<typeof ImageTypeSchema>;

export const ImageSchema = z.object({
  name: z.string(),
  data: z.base64(),
  type: ImageTypeSchema,
});
export type Image = z.infer<typeof ImageSchema>;
