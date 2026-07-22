import z from 'zod';
import {
  LayoutArraySchema,
  LayoutGridSchema,
  LayoutHintSchema,
  LayoutUnhintedItemsSchema,
  UnprocessedLayoutRootSchema,
} from '../shared/types/layout.types';
import {
  FeatureSchema,
  ItemSchema,
  LocationParentSchema,
  LocationSchema,
  PackTrackerJsonSchema,
} from '../shared/types/pack.types';

function printSchema(title: string, schema: z.ZodType) {
  console.log('-----', title.toUpperCase(), '-----');
  console.log(JSON.stringify(z.toJSONSchema(schema)), '\n');
}

printSchema('tracker.json', PackTrackerJsonSchema);
printSchema('item', ItemSchema);
printSchema('location parent', LocationParentSchema);
printSchema('location', LocationSchema);
printSchema('feature', FeatureSchema);
printSchema('layout root', UnprocessedLayoutRootSchema);
printSchema('layout array', LayoutArraySchema);
printSchema('layout grid', LayoutGridSchema);
printSchema('layout unhinted items', LayoutUnhintedItemsSchema);
printSchema('layout hint', LayoutHintSchema);
