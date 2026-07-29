import { fetchLatestRelease } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { DownloadButton } from '../components/download-button';
import { Spinner } from '../components/ui/spinner';

export function DownloadsSection() {
  // !QUERIES
  const {
    data: release,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['latest-release'],
    queryFn: fetchLatestRelease,
  });

  if (isPending) {
    return (
      <section
        id="downloads-pending"
        className="text-bashprime-red flex items-center justify-center gap-3"
      >
        <Spinner className="size-8" />
        <p className="text-xl">Fetching Release...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section id="downloads-error">
        Error loading data: {error.message}
      </section>
    );
  }

  return (
    <section id="downloads" className="flex w-full flex-col gap-2">
      <h2 className="text-bashprime-yellow text-center text-4xl font-semibold">
        Download {release.data.tag_name}
      </h2>
      <div className="flex justify-center gap-2">
        {release.data.assets
          .sort((a, b) => a.name.localeCompare(b.name))
          .reverse()
          .map((asset) => (
            <DownloadButton asset={asset} />
          ))}
      </div>
    </section>
  );
}
