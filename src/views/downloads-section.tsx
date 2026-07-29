import { fetchLatestRelease } from '@/lib/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DownloadButton } from '../components/download-button';
import { Spinner } from '../components/ui/spinner';

export function DownloadsSection() {
  // !HOOKS
  const queryClient = useQueryClient();

  // !QUERIES
  const {
    data: release,
    isFetching,
    isFetched,
    isSuccess,
  } = useQuery({
    queryKey: ['latest-release'],
    queryFn: fetchLatestRelease,
  });

  if (isFetched && !release) {
    return null;
  }

  return (
    <section id="downloads" className="flex w-full flex-col gap-2">
      {isFetching && (
        <div className="text-bashprime-red flex items-center justify-center gap-3">
          <Spinner className="size-8" />
          <p className="text-xl">Fetching Release...</p>
        </div>
      )}
      {isFetched && release && (
        <>
          <h2 className="text-bashprime-yellow text-center text-4xl font-semibold">
            Download {release.data.tag_name}
          </h2>
          <div className="flex justify-center gap-2">
            {release.data.assets
              .sort()
              .reverse()
              .map((asset) => (
                <DownloadButton asset={asset} />
              ))}
          </div>
        </>
      )}
    </section>
  );
}
