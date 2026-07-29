import type { DownloadAsset, ReleaseAsset } from './types';

export function buildDownloadAsset(asset: ReleaseAsset) {
  // Windows
  if (asset.name.includes('windows')) {
    // Installer
    const isInstaller = asset.name.includes('setup');
    return {
      name: `Windows ${isInstaller ? 'Installer' : 'Portable'}`,
      icon: 'windows',
      url: asset.browser_download_url,
    } satisfies DownloadAsset;
  }

  // macOS
  if (asset.name.includes('mac')) {
    return {
      name: 'macOS Executable',
      icon: 'apple',
      url: asset.browser_download_url,
    } satisfies DownloadAsset;
  }

  if (asset.name.includes('linux')) {
    return {
      name: 'Linux AppImage',
      icon: 'linux',
      url: asset.browser_download_url,
    } satisfies DownloadAsset;
  }

  return null;
}
