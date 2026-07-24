import { app } from 'electron';
import path from 'path';
import { isDev } from './util.js';

export function getPreloadPath() {
  return path.join(
    app.getAppPath(),
    isDev() ? '.' : '..',
    'dist-electron/electron/preload.cjs'
  );
}

export function getIconPath() {
  return path.join(
    app.getAppPath(),
    'assets',
    'icon.png'
  )
}