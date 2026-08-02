import { Spinner } from '@/components/ui/spinner';
import { fetchPacks } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { columns } from './columns';
import { DataTable } from './data-table';

export function Packs() {
  const { data, isPending } = useQuery({
    queryKey: ['packs'],
    queryFn: fetchPacks,
  });

  if (isPending) {
    return (
      <section
        id="packs"
        className="flex flex-col items-center gap-2 sm:items-start"
      >
        <h2 className="text-xl font-semibold sm:text-2xl">Packs</h2>
        <Spinner className="size-8" />
        <p className="text-xl">Fetching Packs...</p>
      </section>
    );
  }

  return (
    <section
      id="packs"
      className="flex flex-col items-center gap-2 sm:items-start"
    >
      <h2 className="text-xl font-semibold sm:text-2xl">Packs</h2>
      <DataTable columns={columns} data={data ?? []} />
    </section>
  );
}
