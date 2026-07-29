import type { DownloadAsset, ReleaseAsset } from './types';

export function buildDownloadAsset(asset: ReleaseAsset) {
  // Windows
  if (asset.name.includes('windows')) {
    // Installer
    const isInstaller = asset.name.includes('setup');
    return {
      name: `Windows ${isInstaller ? 'Installer' : 'Portable'}`,
      iconSrc: '/brands/windows.svg',
      url: asset.browser_download_url,
    } satisfies DownloadAsset;
  }

  // macOS
  if (asset.name.includes('mac')) {
    return {
      name: 'macOS Executable',
      iconSrc: '/brands/apple.svg',
      url: asset.browser_download_url,
    } satisfies DownloadAsset;
  }

  if (asset.name.includes('linux')) {
    return {
      name: 'Linux Appimage',
      iconSrc: '/brands/linux.svg',
      url: asset.browser_download_url,
    } satisfies DownloadAsset;
  }

  return null;
}
