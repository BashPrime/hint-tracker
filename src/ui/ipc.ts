import { getDefaultStore } from 'jotai';
import { BasicPackData, PackDetails } from 'src/shared/types/pack.types';
import z from 'zod';
import { activePackState, packsState } from './states/App.states';

export async function fetchPacks() {
  const data = (await window.electronApi.fetchPacks()) as BasicPackData[];
  try {
    getDefaultStore().set(packsState, data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error('fetchPacks(): Error setting store:', data, err.issues);
    }
  }
}

export async function fetchPackDetails(packId: string) {
  const data = (await window.electronApi.fetchPackDetails(
    packId
  )) as PackDetails;
  try {
    getDefaultStore().set(activePackState, data);
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
