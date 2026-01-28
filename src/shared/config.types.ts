import { Rectangle } from 'electron';
import z from 'zod';

export const WindowConfigSchema = z.custom<Rectangle>()
export type WindowConfig = z.infer<typeof WindowConfigSchema>;


export const AppConfigSchema = z.object({
  // toggles: TogglesSchema,
  window: z.custom<Rectangle>(),
});
export type AppConfig = z.infer<typeof AppConfigSchema>;
