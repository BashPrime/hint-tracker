import { z } from 'zod';

export const GameSchema = z.enum(['prime', 'echoes', 'corruption']);
export type Game = z.infer<typeof GameSchema>;

export const ActionSchema = z.enum(['reset-size', 'tracker']);
export type Action = z.infer<typeof ActionSchema>;

export const TrackerConfigSchema = z.object({
  game: GameSchema,
  tracker: z.any(),
});
export type TrackerConfig = z.infer<typeof TrackerConfigSchema>;

export const KeybearerRoomsSchema = z.enum(['aether', 'darkAether', 'both']);
export type KeybearerRooms = z.infer<typeof KeybearerRoomsSchema>;

export const PhazonSuitHintSchema = z.enum(['areaName', 'roomName']);
export type PhazonSuitHint = z.infer<typeof PhazonSuitHintSchema>;

export const TogglesSchema = z.object({
  alwaysOnTop: z.boolean().default(false),
  legacyHintsEnabled: z.boolean().default(false),
  keybearerRoomLabels: KeybearerRoomsSchema.default(
    KeybearerRoomsSchema.enum.both
  ),
  phazonSuitHint: PhazonSuitHintSchema.default(
    PhazonSuitHintSchema.enum.areaName
  ),
});
export type Toggles = z.infer<typeof TogglesSchema>;

