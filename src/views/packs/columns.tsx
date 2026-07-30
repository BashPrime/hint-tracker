import type { Pack } from '@/lib/types';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Pack>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'game',
    header: 'Game',
  },
  {
    accessorKey: 'version',
    header: 'Version',
  },
    {
    accessorKey: 'author',
    header: 'Authors',
  },
];
