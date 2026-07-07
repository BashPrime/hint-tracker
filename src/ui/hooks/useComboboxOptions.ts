import { activePackState } from '@/states/App.states';
import { useAtomValue } from 'jotai';
import { ComboboxOptionKey, ComboboxOptionKeys } from 'src/shared/types/layout.types';
import {
    Feature,
    Item,
    LocationParent,
    PackDetails,
} from 'src/shared/types/pack.types';

function buildItemsOptions(items: Item[]): string[] {
  return items.map((i) => i.name);
}

function buildLocationsOptions(locations: LocationParent[]): string[] {
  return locations
    .map((parent) => parent.children.map((c) => c.name))
    .reduce((acc, locations) => acc.concat(...locations), []);
}

function buildRegionsOptions(locations: LocationParent[]): string[] {
  return locations.map((l) => l.name);
}

function buildItemFeatureOptions(features: Feature[]): string[] {
  return features.filter((f) => f.type === 'feature:item').map((f) => f.name);
}

function buildLocationFeatureOptions(features: Feature[]): string[] {
  return features
    .filter((f) => f.type === 'feature:location')
    .map((f) => f.name);
}

function parseOptions(pack: PackDetails, optionKeys: ComboboxOptionKey[]) {
  const options: string[] = [];

  for (const af of optionKeys) {
    switch (af) {
      case 'items':
        options.push(...buildItemsOptions(pack.items));
        break;
      case 'locations':
        options.push(...buildLocationsOptions(pack.locations));
        break;
      case 'regions':
        options.push(...buildRegionsOptions(pack.locations));
        break;
      case 'features:item':
        options.push(...buildItemFeatureOptions(pack.features));
        break;
      case 'features:location':
        options.push(...buildLocationFeatureOptions(pack.features));
        break;
    }
  }

  return options.sort((a, b) => a.localeCompare(b));
}

export function useComboboxOptions(comboOptions: ComboboxOptionKeys) {
  // !STATE
  const pack = useAtomValue(activePackState);

  const itemOptions: string[] =
    pack && comboOptions.item ? parseOptions(pack, comboOptions.item) : [];
  const locationOptions: string[] =
    pack && comboOptions.location
      ? parseOptions(pack, comboOptions.location)
      : [];

  return {
    item: itemOptions,
    location: locationOptions,
  };
}
