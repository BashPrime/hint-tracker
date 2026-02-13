import z from 'zod';

export const CoverTypeSchema = z.enum(['webp', 'png', 'jpeg']);
export type CoverType = z.infer<typeof CoverTypeSchema>;

export const CoverSchema = z.object({
  name: z.string(),
  data: z.base64(),
  type: CoverTypeSchema,
});
export type Cover = z.infer<typeof CoverSchema>;
