import { getDefaultStore } from 'jotai';
import { BasicPack, PackDetails } from 'src/shared/types/pack.types';
import z from 'zod';
import { buildComboboxOptionsDatabase } from './helpers/comboboxOptions';
import { activePackState, packsState } from './states/App.states';
import { comboboxOptionsDbState } from './states/combobox.states';

export async function fetchPacks() {
  const data = (await window.electronApi.fetchPacks()) as BasicPack[];
  try {
    getDefaultStore().set(packsState, data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error('fetchPacks(): Error setting store:', data, err.issues);
    }
  }
}

export async function fetchPackDetails(packId: string) {
  const store = getDefaultStore();
  const pack = (await window.electronApi.fetchPackDetails(
    packId
  )) as PackDetails;
  try {
    // set active pack
    store.set(activePackState, pack);

    // build combobox options db
    const optionsDb = buildComboboxOptionsDatabase(pack);
    store.set(comboboxOptionsDbState, buildComboboxOptionsDatabase(pack));
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error(
        'fetchPackDetails(): Error setting store:',
        pack,
        err.issues
      );
    }
  }
}
