import type { DownloadAsset, ReleaseAsset } from './types';

export function buildDownloadAsset(asset: ReleaseAsset) {
  const assetName = asset.name.toLowerCase();
  // Windows
  if (assetName.includes('windows')) {
    // Installer
    const isInstaller = assetName.includes('installer') || assetName.includes('setup');
    return {
      name: `Windows ${isInstaller ? 'Installer' : 'Portable'}`,
      icon: 'windows',
      url: asset.browser_download_url,
    } satisfies DownloadAsset;
  }

  // macOS
  if (assetName.includes('macos') || assetName.includes('mac')) {
    return {
      name: 'macOS Executable',
      icon: 'apple',
      url: asset.browser_download_url,
    } satisfies DownloadAsset;
  }

  if (assetName.includes('linux')) {
    return {
      name: 'Linux AppImage',
      icon: 'linux',
      url: asset.browser_download_url,
    } satisfies DownloadAsset;
  }

  return null;
}
