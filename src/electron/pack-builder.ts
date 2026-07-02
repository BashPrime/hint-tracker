import AdmZip from 'adm-zip';
import {
  BasicPackData,
  PackDetails,
  PackDetailsSchema,
} from '../shared/types/pack.type.js';

export function buildPackDetails(pack: BasicPackData): PackDetails {
  const items = buildItems(pack);
  const locations = buildLocations(pack);
  const features = buildFeatures(pack);

  return PackDetailsSchema.parse({
    id: pack.data.id,
    items,
    locations,
    features,
  });
}

function buildItems(pack: BasicPackData): any[] {
  const zip = new AdmZip(pack.path);
  const items = [];

  for (const itemPath of pack.data.items) {
    const newItems = JSON.parse(zip.readAsText(itemPath));
    items.push(...newItems);
  }

  return items;
}

function buildLocations(pack: BasicPackData): any[] {
  const zip = new AdmZip(pack.path);
  const locations = [];

  for (const locationPath of pack.data.locations) {
    const newLocations = JSON.parse(zip.readAsText(locationPath));
    locations.push(...newLocations);
  }

  return locations;
}

function buildFeatures(pack: BasicPackData): any[] {
  const zip = new AdmZip(pack.path);
  const features = [];

  for (const featurePath of pack.data.features) {
    const newFeatures = JSON.parse(zip.readAsText(featurePath));
    features.push(...newFeatures);
  }

  return features;
}
