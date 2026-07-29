import { AppleIcon, LinuxIcon, WindowsIcon } from '@/assets/brand-icons';
import { buildDownloadAsset } from '@/lib/helpers';
import type { ReleaseAsset } from '@/lib/types';
import { Button } from './ui/button';

type Props = {
  asset: ReleaseAsset;
};
export function DownloadButton({ asset }: Props) {
  const parsed = buildDownloadAsset(asset);

  if (!parsed) {
    return null;
  }

  return (
    <a href={asset.browser_download_url}>
      <Button variant="secondary" className="bg-bashprime-red fill-foreground py-5">
        {parsed.icon === 'windows' && <WindowsIcon />}
        {parsed.icon === 'apple' && <AppleIcon />}
        {parsed.icon === 'linux' && <LinuxIcon />}
        <span className="text-lg">{parsed.name}</span>
      </Button>
    </a>
  );
}
