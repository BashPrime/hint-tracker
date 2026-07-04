import { activePackState } from '@/states/App.states';
import { useAtomValue } from 'jotai';
import { AutofillOption, Autofills } from 'src/shared/types/layout.types';
import { Item, LocationParent, PackDetails } from 'src/shared/types/pack.types';

function buildItemsOptions(items: Item[]): string[] {
  return items.map((i) => i.name);
}

function buildLocationsOptions(locations: LocationParent[]): string[] {
  const options = [];
  for (const region of locations) {
    for (const location of region.children) {
      options.push(location.name);
    }
  }

  return options.sort((a, b) => a.localeCompare(b));
}

function buildRegionsOptions(locations: LocationParent[]): string[] {
  return locations.map((l) => l.name);
}

function parseOptions(pack: PackDetails, optionKeys: AutofillOption[]) {
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
        break;
      case 'features:location':
        break;
    }
  }

  return options;
}

export function useComboboxOptions(comboOptions: Autofills) {
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
