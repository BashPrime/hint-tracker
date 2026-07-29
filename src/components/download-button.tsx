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
      <Button className="bg-bashprime-red text-foreground">
        <img src={parsed.iconSrc} className="h-4 w-auto" />
        {parsed.name}
      </Button>
    </a>
  );
}
