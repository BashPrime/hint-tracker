import { app, clipboard, shell } from 'electron';
import { readFile } from 'fs/promises';
import os from 'os';
import { BASE_PROJECT_URL } from './constants.js';
import { getAboutPanelIconPath, getLicensePath } from './pathResolver.js';
import { getErrorMsg, isDev, showDialog } from './util.js';

export async function showAboutPanel() {
  const xdgSessionType = process.env.XDG_SESSION_TYPE;
  const details = [
    `Version: ${app.getVersion()}`,
    `OS: ${os.type} ${os.arch} ${process.getSystemVersion()}`,
    ...(xdgSessionType
      ? [`Display Server: ${process.env.XDG_SESSION_TYPE}`]
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

export async function showLicense() {
  // https://github.com/BashPrime/hint-tracker/blob/['main' or 'vX.Y.Z']/NOTICE
  const noticeUrl = new URL(
    `blob/${isDev() ? 'main' : `v${app.getVersion()}`}/NOTICE`,
    BASE_PROJECT_URL
  );

  try {
    const license = await readFile(getLicensePath(), 'utf-8');

    const res = await showDialog({
      type: 'info',
      icon: getAboutPanelIconPath(),
      title: 'License',
      message: 'License',
      detail: license,
      buttons: ['View Third-Party Licenses', 'OK'],
      defaultId: 1,
      cancelId: 1,
      noLink: true,
    });

    if (res?.response === 0) {
      shell.openExternal(noticeUrl.href);
    }
  } catch (err) {
    console.error('showLicense(): Error reading license:', getErrorMsg(err));
    showDialog({
      type: 'error',
      title: 'Error Getting License',
      message:
        'The application encountered an error getting the software license.',
    });
  }
}
