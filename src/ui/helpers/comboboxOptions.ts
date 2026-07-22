import {
  ComboboxOptionsDb,
  ComboboxOptionsDbGroupRecord,
} from '@/types/combobox.types';
import {
  Feature,
  Item,
  LocationParent,
  PackDetails,
} from '../../shared/types/pack.types';
import { capitalizeFirstLetter } from './string';

function parseItems(items: Item[]): ComboboxOptionsDbGroupRecord {
  const group: ComboboxOptionsDbGroupRecord = {};

  for (const item of items) {
    const capitalizedType = capitalizeFirstLetter(item.type);

    // create group array if it doesn't exist
    if (!group[capitalizedType]) {
      group[capitalizedType] = [];
    }

    group[capitalizedType].push(item.name);
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
