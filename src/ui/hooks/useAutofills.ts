import { activePackState } from '@/states/App.states';
import { useAtomValue } from 'jotai';
import { LocationParent } from 'src/shared/types/pack.types';

function buildLocationOptions(locations: LocationParent[]) {
  const options = [];
  for (const region of locations) {
    for (const location of region.children) {
      options.push({ ...location, region: region });
    }
  }

  return options.sort((a, b) => a.name.localeCompare(b.name));
}

export function useAutofills() {
  // !STATE
  const pack = useAtomValue(activePackState);

  // Flatten locations
  const location = buildLocationOptions(pack?.locations ?? []);

  return {
    location,
  };
}
