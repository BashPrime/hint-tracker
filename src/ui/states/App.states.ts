import { atom } from 'jotai';
import { BasicPackData } from 'src/shared/types/pack.type';

export const packsState = atom<BasicPackData[] | null>(null);
export const activePackState = atom<BasicPackData | null>(null);
