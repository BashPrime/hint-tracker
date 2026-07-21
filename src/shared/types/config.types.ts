import { Rectangle } from 'electron';
import z from 'zod';
import { SemVerSchema } from './base.types.js';

export const ConfigSchema = z.object({
  theme: z.enum(['system', 'light', 'dark']),
  window: z.custom<Rectangle>(),
  resetSizeOnPackOpen: z.boolean(),
});
export type ConfigType = z.infer<typeof ConfigSchema>;

export const WindowConfigSchema = z.custom<Rectangle>();
export type WindowConfig = z.infer<typeof WindowConfigSchema>;

export const TrackerStateSchema = z.record(
  z.string(),
  z.object({
    item: z.string().nullable(),
    location: z.string().nullable(),
    checked: z.boolean(),
  })
);
export type TrackerState = z.infer<typeof TrackerStateSchema>;

export const TrackerSaveStateSchema = z.object({
  pack: z.object({
    id: z.string(),
    version: SemVerSchema,
  }),
  state: TrackerStateSchema,
});
export type TrackerSaveState = z.infer<typeof TrackerSaveStateSchema>;
