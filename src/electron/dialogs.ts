import { app, clipboard, shell } from 'electron';
import { readFile } from 'fs/promises';
import os from 'os';
import { BASE_GITHUB_URL, GH_PAGES_URL } from './constants.js';
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
    BASE_GITHUB_URL
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

export async function showHowToUse() {
  const details = [
    'There are community-made packs that can be downloaded from the Hint Tracker website.',
    'Hints can be marked as checked by right-clicking them.',
    'If you prefer clicking checkboxes directly, turn on Accessible Checkboxes from the Toggles menu.',
    'The X button needs to be double-clicked to remove a hint from the Unhinted Items list.',
  ].map((d, idx) => `${idx + 1}. ${d}`);

  const res = await showDialog({
    type: 'info',
    icon: getAboutPanelIconPath(),
    title: 'How To Use',
    message: 'How to Use the Tracker',
    detail: details.join('\n'),
    buttons: ['View Website', 'OK'],
    defaultId: 1,
    cancelId: 1,
    noLink: true,
  });

  // User clicked 'View Website'
  if (res?.response === 0) {
    shell.openExternal(GH_PAGES_URL);
  }
}
