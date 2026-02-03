import { Layout } from '@/types/layout.types';
import { atom } from 'jotai';
import { Preset } from 'src/shared/preset.types';

export const userAppearanceState = atom<'light' | 'dark' | 'system'>('system');

export const appearanceState = atom((get) => {
  const userAppearance = get(userAppearanceState);

  if (userAppearance !== 'system') {
    return userAppearance;
  }

  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return 'light';
});

export const presetsState = atom<Preset[] | null>(null);
export const activePresetState = atom<Preset | null>(null);

export const activeHintLayoutState = atom<Layout | null>(null);
