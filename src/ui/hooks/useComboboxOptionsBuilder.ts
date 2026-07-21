import { comboboxOptionsDbState } from '@/states/Combobox.states';
import {
  ComboboxOption,
  ComboboxOptionsDbGroupRecord,
} from '@/types/combobox.types';
import { useAtomValue } from 'jotai';

function processDbRecord(
  record: ComboboxOptionsDbGroupRecord
): ComboboxOption[] {
  const options: ComboboxOption[] = [];

  for (const [group, items] of Object.entries(record)) {
    options.push({
      group,
      items: items.sort((a, b) => a.localeCompare(b)),
    });
  }

  return options;
}

export function useComboboxOptionsBuilder() {
  const optionsDb = useAtomValue(comboboxOptionsDbState);

  function buildOptions(keys: string[]) {
    let options: ComboboxOption[] = [];

    for (const key of keys) {
      switch (key) {
        case 'items':
          options.push(...processDbRecord(optionsDb?.items ?? {}));
          break;
        case 'locations':
          options.push(...processDbRecord(optionsDb?.locations ?? {}));
          break;
        case 'regions':
          options.push(...processDbRecord(optionsDb?.regions ?? {}));
          break;
        case 'features:item':
          options.push(...processDbRecord(optionsDb?.['features:item'] ?? {}));
          break;
        case 'features:location':
          options.push(
            ...processDbRecord(optionsDb?.['features:location'] ?? {})
          );
          break;
      }
    }

    return options;
  }

  return {
    buildOptions,
  };
}
