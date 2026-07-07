import { comboboxOptionsDbState } from '@/states/combobox.states';
import { useAtomValue } from 'jotai';

export function useComboboxOptionsBuilder() {
  const optionsDb = useAtomValue(comboboxOptionsDbState);

  function buildOptions(keys: string[]) {
    const options: string[] = [];

    for (const key of keys) {
      switch (key) {
        case 'items':
          options.push(...(optionsDb?.items ?? []));
          break;
        case 'locations':
          options.push(...(optionsDb?.locations.map((l) => l.name) ?? []));
          break;
        case 'regions':
          options.push(...(optionsDb?.regions ?? []));
          break;
        case 'features:item':
          options.push(...(optionsDb?.['features:item'] ?? []));
          break;
        case 'features:location':
          options.push(...(optionsDb?.['features:location'] ?? []));
          break;
      }
    }

    return options.sort((a, b) => a.localeCompare(b));
  }

  return {
    buildOptions,
  };
}
