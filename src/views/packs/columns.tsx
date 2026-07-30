import { Button } from '@/components/ui/button';
import type { Pack } from '@/lib/types';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import type { ReactNode } from 'react';

type SortableHeaderProps = {
  children: ReactNode;
  isSorted: 'asc' | 'desc' | false;
  onClick: () => void;
};

function SortableHeader({ children, onClick, isSorted }: SortableHeaderProps) {
  return (
    <Button variant="ghost" onClick={onClick}>
      {children}
      {{
        asc: <ArrowUp className="ml-1 h-4 w-4" />,
        desc: <ArrowDown className="ml-1 h-4 w-4" />,
      }[isSorted as string] ?? <ArrowUpDown className="ml-1 h-4 w-4" />}
    </Button>
  );
}

export const columns: ColumnDef<Pack>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <SortableHeader
          isSorted={column.getIsSorted()}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Pack
        </SortableHeader>
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
        <SortableHeader
          isSorted={column.getIsSorted()}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Game
        </SortableHeader>
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
