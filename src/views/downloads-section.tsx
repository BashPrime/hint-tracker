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
    <section id="downloads" className="w-full">
      {isFetching && (
        <div>
          <Spinner />
          Fetching...
        </div>
      )}
      {release && (
        <>
          <h2 className="text-bashprime-yellow text-center text-2xl font-bold">
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
