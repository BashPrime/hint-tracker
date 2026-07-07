import { ComboboxOptionsDb, LocationWithRegion } from '@/types/combobox.types';
import {
  Feature,
  Item,
  LocationParent,
  PackDetails,
} from 'src/shared/types/pack.types';

function parseItems(items: Item[]): string[] {
  return items.map((i) => i.name);
}

function parseLocations(locations: LocationParent[]): LocationWithRegion[] {
  return locations
    .map((parent) =>
      parent.children.map((c) => ({ ...c, region: parent.name }))
    )
    .reduce((acc, locations) => acc.concat(...locations), []);
}

function parseRegions(locations: LocationParent[]): string[] {
  return locations.map((l) => l.name);
}

function parseItemFeatures(features: Feature[]): string[] {
  return features.filter((f) => f.type === 'feature:item').map((f) => f.name);
}

function parseLocationFeatures(features: Feature[]): string[] {
  return features
    .filter((f) => f.type === 'feature:location')
    .map((f) => f.name);
}

export function buildComboboxOptionsDatabase(
  pack: PackDetails
): ComboboxOptionsDb {
  return {
    items: parseItems(pack.items),
    locations: parseLocations(pack.locations),
    regions: parseRegions(pack.locations),
    'features:item': parseItemFeatures(pack.features),
    'features:location': parseLocationFeatures(pack.features),
  };
}
