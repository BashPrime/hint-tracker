import AdmZip from 'adm-zip';
import z from 'zod';
import {
  LayoutGroupSchema,
  UnprocessedLayoutRoot,
  UnprocessedLayoutRootSchema,
} from '../shared/types/layout.types.js';
import {
  BasicPack,
  PackDetails,
  PackDetailsSchema,
} from '../shared/types/pack.types.js';

export function buildPackDetails(pack: BasicPack): PackDetails {
  const items = buildItems(pack);
  const locations = buildLocations(pack);
  const features = buildFeatures(pack);
  const layout = buildLayout(pack);

  return PackDetailsSchema.parse({
    id: pack.id,
    items,
    locations,
    features,
    layout,
  });
}

function buildItems(pack: BasicPack): any[] {
  const zip = new AdmZip(pack.path);
  const items = [];

  for (const itemPath of pack.items) {
    const newItems = JSON.parse(zip.readAsText(itemPath));
    items.push(...newItems);
  }

  return items;
}

function buildLocations(pack: BasicPack): any[] {
  const zip = new AdmZip(pack.path);
  const locations = [];

  for (const locationPath of pack.locations) {
    const newLocations = JSON.parse(zip.readAsText(locationPath));
    locations.push(...newLocations);
  }

  return locations;
}

function buildFeatures(pack: BasicPack): any[] {
  const zip = new AdmZip(pack.path);
  const features = [];

  for (const featurePath of pack.features) {
    const newFeatures = JSON.parse(zip.readAsText(featurePath));
    features.push(...newFeatures);
  }

  return features;
}

const LayoutGroupJsonSchema = z.record(z.string(), LayoutGroupSchema);
type LayoutGroupJson = z.infer<typeof LayoutGroupJsonSchema>;

function getLayoutRoot(layout: LayoutGroupJson): UnprocessedLayoutRoot | null {
  for (const [key, val] of Object.entries(layout)) {
    if (val.type === 'root') {
      return UnprocessedLayoutRootSchema.parse(val);
    }
  }

  return null;
}

function buildLayout(pack: BasicPack) {
  const zip = new AdmZip(pack.path);
  const layoutGroups: LayoutGroupJson = {};

  // Build initial, unprocessed layout object
  for (const layoutPath of pack.layout) {
    const json = JSON.parse(zip.readAsText(layoutPath));
    const parsedGroup = LayoutGroupJsonSchema.safeParse(json);

    if (parsedGroup.success) {
      // Assign to groups
      Object.assign(layoutGroups, parsedGroup.data);
    }
  }

  // Get layout root
  const layoutRoot = getLayoutRoot(layoutGroups);

  if (!layoutRoot) {
    return {};
  }

  // replace the pointers with the objects they represent
  return {
    ...layoutRoot,
    content: layoutRoot.content.map((p) => layoutGroups[p.key]),
  };
}
