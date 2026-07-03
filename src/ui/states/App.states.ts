import { atom } from 'jotai';
import { BasicPackData, PackDetails } from 'src/shared/types/pack.types';

export const packsState = atom<BasicPackData[] | null>(null);
export const activePackState = atom<PackDetails | null>(null);
