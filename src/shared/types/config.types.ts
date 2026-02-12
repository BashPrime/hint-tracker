import { Rectangle } from 'electron';
import z from 'zod';

export const ConfigSchema = z.object({
  theme: z.enum(['system', 'light', 'dark']),
  window: z.custom<Rectangle>(),
});
export type ConfigType = z.infer<typeof ConfigSchema>;

export const WindowConfigSchema = z.custom<Rectangle>();
export type WindowConfig = z.infer<typeof WindowConfigSchema>;
