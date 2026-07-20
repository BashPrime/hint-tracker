import {
  ComboboxOptionsDb,
  ComboboxOptionsDbGroupRecord,
} from '@/types/combobox.types';
import {
  Feature,
  Item,
  LocationParent,
  PackDetails,
} from 'src/shared/types/pack.types';

function parseItems(items: Item[]): ComboboxOptionsDbGroupRecord {
  const group: ComboboxOptionsDbGroupRecord = {};

  for (const type of [...new Set(items.map((i) => i.type))]) {
    group[type] = [];
  }

  for (const item of items) {
    group[item.type].push(item.name);
  }

  return group;
}

function parseLocations(
  locations: LocationParent[]
): ComboboxOptionsDbGroupRecord {
  const group: ComboboxOptionsDbGroupRecord = {};

  for (const location of locations) {
    group[location.name] = location.children.map((c) => c.name);
  }

  return group;
}

function parseRegions(
  locations: LocationParent[]
): ComboboxOptionsDbGroupRecord {
  const group: ComboboxOptionsDbGroupRecord = { Region: [] };

  for (const location of locations) {
    group.Region.push(location.name);
  }

  return group;
}

function parseItemFeatures(features: Feature[]): ComboboxOptionsDbGroupRecord {
  const group: ComboboxOptionsDbGroupRecord = { Feature: [] };

  for (const feature of features.filter((f) => f.type === 'feature:item')) {
    group.Feature.push(feature.name);
  }

  return group;
}

function parseLocationFeatures(
  features: Feature[]
): ComboboxOptionsDbGroupRecord {
  const group: ComboboxOptionsDbGroupRecord = { Feature: [] };

  for (const feature of features.filter((f) => f.type === 'feature:location')) {
    group.Feature.push(feature.name);
  }

  return group;
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
