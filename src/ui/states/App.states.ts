import { HintLayout } from '@/types/hint-layout.types';
import { atom } from 'jotai';
import { Preset } from 'src/shared/preset.types';

export const userAppearanceState = atom<'light' | 'dark' | 'system'>('system');

export const systemAppearanceState = atom<'light' | 'dark'>((get) => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return 'light';
});

export const appearanceState = atom((get) => {
  const userAppearance = get(userAppearanceState);
  const systemAppearance = get(systemAppearanceState);

  return userAppearance === 'system' ? systemAppearance : userAppearance;
});

export const presetsState = atom<Preset[] | null>(null);
export const activePresetState = atom<Preset | null>(null);

export const activeHintLayoutState = atom<HintLayout | null>(null);
