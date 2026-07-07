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
  const data = (await window.electronApi.fetchPackDetails(
    packId
  )) as PackDetails;
  try {
    // set active pack
    store.set(activePackState, data);

    // build combobox options db
    store.set(comboboxOptionsDbState, buildComboboxOptionsDatabase(data));
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error(
        'fetchPackDetails(): Error setting store:',
        data,
        err.issues
      );
    }
  }
}
