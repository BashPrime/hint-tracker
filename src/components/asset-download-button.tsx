import { AppleIcon, LinuxIcon, WindowsIcon } from '@/assets/brand-icons';
import { buildDownloadAsset } from '@/lib/helpers';
import type { ReleaseAsset } from '@/lib/types';
import { Button } from './ui/button';

type Props = {
  asset: ReleaseAsset;
};
export function AssetDownloadButton({ asset }: Props) {
  const parsed = buildDownloadAsset(asset);

  if (!parsed) {
    return null;
  }

  return (
    <a href={asset.browser_download_url}>
      <Button
        variant="secondary"
        className="bg-bashprime-red fill-foreground py-5 w-full"
      >
        {parsed.icon === 'windows' && <WindowsIcon data-icon="inline-start" />}
        {parsed.icon === 'apple' && <AppleIcon data-icon="inline-start" />}
        {parsed.icon === 'linux' && <LinuxIcon data-icon="inline-start" />}
        <span className="text-sm sm:text-lg">{parsed.name}</span>
      </Button>
    </a>
  );
}
