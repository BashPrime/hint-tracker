import { app } from 'electron';
import os from 'os';
import { COPYRIGHT_YEAR } from './constants.js';
import { getAboutPanelIconPath } from './pathResolver.js';
import { showDialog } from './util.js';

export function showAboutPanel() {
  const xdgSessionType = process.env.XDG_SESSION_TYPE;
  const details = [
    `Version: ${app.getVersion()}`,
    `OS: ${os.version} ${os.arch} ${process.getSystemVersion()}`,
    ...(xdgSessionType
      ? [`XDG Session Type: ${process.env.XDG_SESSION_TYPE}`]
      : []),
    `Electron: ${process.versions.electron}`,
    `Node.js: ${process.versions.node}`,
    `Chromium: ${process.versions.chrome}`,
    `V8: ${process.versions.v8}`,
  ];

  showDialog({
    type: 'info',
    icon: getAboutPanelIconPath(),
    title: `About ${app.getName()}`,
    message: app.getName(),
    detail: details.join('\n'),
  });
}

export function showLicense() {
  const details = [
    `Copyright (c) ${COPYRIGHT_YEAR} BashPrime`,
    'This software is free for personal and commercial use under the MIT License.',
  ];

  showDialog({
    type: 'info',
    title: 'License',
    message: 'License',
    detail: details.join('\n'),
  });
}
