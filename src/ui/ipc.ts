import { comboboxOptionsDbState } from '@/states/Combobox.states';
import { getDefaultStore } from 'jotai';
import z from 'zod';
import { TrackerSaveState } from '../shared/types/config.types';
import { Image } from '../shared/types/image.types';
import { BasicPack, PackDetails } from '../shared/types/pack.types';
import { buildComboboxOptionsDatabase } from './helpers/comboboxOptions';
import { activePackState, packsState } from './states/App.states';

export function rendererLoaded() {
  window.electronApi.rendererLoaded();
}

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

export async function fetchImage(packId: string, imgPath: string) {
  return (await window.electronApi.fetchImage(packId, imgPath)) as Image;
}

export function autosaveTrackerState(state: object, packId: string) {
  window.electronApi.autosaveTrackerState(state, packId);
}

export async function fetchTrackerAutosave(packId: string) {
  return (await window.electronApi.loadTrackerAutosave(
    packId
  )) as TrackerSaveState;
}

export function setExportTrackerStateMenuItem(enabled: boolean) {
  window.electronApi.setTrackerMenuItems(enabled);
}

export function installPack() {
  window.electronApi.installPack();
}
