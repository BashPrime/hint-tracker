import { getDefaultStore } from 'jotai';
import { BasicPackData } from 'src/shared/types/pack.type';
import z from 'zod';
import { packsState } from './states/App.states';

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
  const data = await window.electronApi.fetchPackDetails(packId);
  // try {
  //   getDefaultStore().set(packsState, data);
  // } catch (err) {
  //   if (err instanceof z.ZodError) {
  //     console.error('fetchPacks(): Error setting store:', data, err.issues);
  //   }
  // }
}
