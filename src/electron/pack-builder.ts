import AdmZip from 'adm-zip';
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

function buildLayout(pack: BasicPack): object {
  const zip = new AdmZip(pack.path);
  const layout = {};

  for (const layoutPath of pack.layout) {
    const layoutItem = JSON.parse(zip.readAsText(layoutPath));
    Object.assign(layout, layoutItem);
  }

  return layout;
}
