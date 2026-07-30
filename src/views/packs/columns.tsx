import { Button } from '@/components/ui/button';
import type { Pack } from '@/lib/types';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<Pack>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Pack
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (row) => row.name,
    cell: ({ row }) => {
      const { name, version } = row.original;

      return (
        <div className="flex flex-col">
          <p>{name}</p>
          <p className="text-muted-foreground text-xs">v{version}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'game',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Game
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'author',
    header: 'Author(s)',
  },
  {
    accessorKey: 'downloadUrl',
    header: undefined,
    cell: ({ row }) => (
      <a href={row.getValue('downloadUrl')} target="_blank">
        <Button className="bg-bashprime-yellow">Download</Button>
      </a>
    ),
  },
];
