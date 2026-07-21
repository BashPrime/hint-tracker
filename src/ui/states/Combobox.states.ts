import { ComboboxOptionsDb } from '@/types/combobox.types';
import { atom } from 'jotai';

export const comboboxOptionsDbState = atom<ComboboxOptionsDb | null>(null);
