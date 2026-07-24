import { app } from 'electron';
import path from 'path';
import { isDev } from './util.js';

export function getPreloadPath() {
  return path.join(
    app.getAppPath(),
    isDev() ? '.' : '..',
    'dist-electron',
    'electron',
    'preload.cjs'
  );
}

export function getIconPath() {
  return path.join(app.getAppPath(), 'assets', 'icon.png');
}

export function getAboutPanelIconPath() {
  const iconPath = path.join(
    app.getAppPath(),
    'assets',
    'icons',
    process.platform === 'win32' ? '48x48.png' : '64x64.png'
  );

  if (isDev()) {
    return iconPath;
  }

  return iconPath.replace('app.asar', 'app.asar.unpacked');
}
