import z from 'zod';

export const GameDataSchema = z.object({
  items: z.array(
    z.object({
      name: z.string(),
      type: z.enum(['progression', 'useful', 'filler', 'feature']),
    })
  ),
  locations: z.array(
    z.object({
      name: z.string(),
      region: z.string().optional(),
      type: z.enum(['location', 'feature']).default('location'),
    })
  ),
});
export type GameData = z.infer<typeof GameDataSchema>;

export const GameCoverSchema = z.object({
  data: z.base64(),
  type: z.enum(['webp', 'png', 'jpeg']),
});
export type GameCover = z.infer<typeof GameCoverSchema>;

export const GameSchema = z.object({
  schemaVersion: z.number(),
  id: z.uuidv4(),
  name: z.string(),
  cover: GameCoverSchema.optional(),
  data: GameDataSchema,
});
export type Game = z.infer<typeof GameSchema>;
