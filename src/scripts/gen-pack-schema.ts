import {
  FeatureSchema,
  ItemSchema,
  LocationSchema,
  PackTrackerJsonSchema,
} from 'src/shared/types/pack.types';
import z from 'zod';

function printSchema(title: string, schema: z.ZodType) {
  console.log('-----', title.toUpperCase(), '-----');
  console.log(JSON.stringify(z.toJSONSchema(schema)), '\n');
}

printSchema('tracker.json', PackTrackerJsonSchema);
printSchema('item', ItemSchema);
printSchema('location', LocationSchema);
printSchema('feature', FeatureSchema);
