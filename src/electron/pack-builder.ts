import AdmZip from 'adm-zip';
import { LayoutRoot, LayoutRootSchema } from '../shared/types/layout.types.js';
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

function getLayoutRoot(layout: object): LayoutRoot | null {
  for (const [key, val] of Object.entries(layout)) {
    const parsed = LayoutRootSchema.safeParse(val);

    if (parsed.success) {
      return parsed.data;
    }
  }

  return null;
}

function buildLayout(pack: BasicPack) {
  const zip = new AdmZip(pack.path);
  const baseLayout: { [key: string]: object } = {};

  // Build initial, unprocessed layout object
  for (const layoutPath of pack.layout) {
    const layoutItem = JSON.parse(zip.readAsText(layoutPath));
    Object.assign(baseLayout, layoutItem);
  }

  // Get the layout root
  const layoutRoot = getLayoutRoot(baseLayout);

  if (!layoutRoot) {
    return {};
  }

  // replace the pointers with the objects they represent
  return {
    ...layoutRoot,
    content: layoutRoot.content.map((p) => baseLayout[p.key]),
  };
}
