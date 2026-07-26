import { app, clipboard } from 'electron';
import os from 'os';
import { COPYRIGHT_YEAR } from './constants.js';
import { getAboutPanelIconPath } from './pathResolver.js';
import { showDialog } from './util.js';

export async function showAboutPanel() {
  const xdgSessionType = process.env.XDG_SESSION_TYPE;
  const details = [
    `Version: ${app.getVersion()}`,
    `OS: ${os.type} ${os.arch} ${process.getSystemVersion()}`,
    ...(xdgSessionType
      ? [`XDG Session Type: ${process.env.XDG_SESSION_TYPE}`]
      : []),
    `Electron: ${process.versions.electron}`,
    `Node.js: ${process.versions.node}`,
    `Chromium: ${process.versions.chrome}`,
    `V8: ${process.versions.v8}`,
  ];
  const detailsStr = details.join('\n');

  const res = await showDialog({
    type: 'info',
    icon: getAboutPanelIconPath(),
    title: `About ${app.getName()}`,
    message: app.getName(),
    detail: detailsStr,
    buttons: ['Copy', 'OK'],
    defaultId: 1,
    cancelId: 1,
    noLink: true,
  });

  // User clicked 'Copy'
  if (res?.response === 0) {
    clipboard.writeText(detailsStr);
  }
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
