import z from 'zod';

export const GameDataItemTypeSchema = z.enum([
  'progression',
  'useful',
  'filler',
  'feature',
]);
export type GameDataItemType = z.infer<typeof GameDataItemTypeSchema>;

export const GameDataLocationTypeSchema = z
  .enum(['location', 'feature'])
  .default('location');
export type GameDataLocationType = z.infer<typeof GameDataLocationTypeSchema>;

export const GameDataItemSchema = z.object({
  name: z.string(),
  type: GameDataItemTypeSchema,
});
export type GameDataItem = z.infer<typeof GameDataItemSchema>;

export const GameDataLocationSchema = z.object({
  name: z.string(),
  region: z.string().optional(),
  type: GameDataLocationTypeSchema,
});
export type GameDataLocation = z.infer<typeof GameDataLocationSchema>;

export const GameDataSchema = z.object({
  items: z.array(GameDataItemSchema),
  locations: z.array(GameDataLocationSchema),
});
export type GameData = z.infer<typeof GameDataSchema>;

export const GameSchema = z.object({
  schemaVersion: z.number(),
  id: z.uuidv4(),
  name: z.string(),
  coverImg: z.string().default(""),
  data: GameDataSchema,
});
export type Game = z.infer<typeof GameSchema>;
