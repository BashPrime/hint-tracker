import { HintLayout } from '@/types/hint-layout.types';
import { atom } from 'jotai';
import { Preset } from 'src/shared/preset.types';

export const userDisplayModeState = atom<'light' | 'dark' | 'system'>('system');

export const systemDisplayModeState = atom<'light' | 'dark'>((get) => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return 'light';
});

export const displayModeState = atom((get) => {
  const userDisplayMode = get(userDisplayModeState);
  const systemDisplayMode = get(systemDisplayModeState);

  if (userDisplayMode === 'system') {
    return systemDisplayMode;
  }

  return userDisplayMode;
});

export const presetsState = atom<Preset[] | null>(null);
export const activePresetState = atom<Preset | null>(null);

export const activeHintLayoutState = atom<HintLayout | null>(null);
