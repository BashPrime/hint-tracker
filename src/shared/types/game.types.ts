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

export const GameSchema = z.object({
  schemaVersion: z.number(),
  id: z.uuidv4(),
  name: z.string(),
  data: GameDataSchema,
});
