import { Button } from '@/components/ui/button';
import type { Pack } from '@/lib/types';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, Download } from 'lucide-react';
import type { ReactNode } from 'react';

type SortableHeaderProps = {
  children: ReactNode;
  isSorted: 'asc' | 'desc' | false;
  onClick: () => void;
  className?: string;
};

function SortableHeader({
  children,
  onClick,
  isSorted,
  className,
}: SortableHeaderProps) {
  return (
    <Button variant="ghost" onClick={onClick} className={className}>
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
          className="hidden sm:inline-flex"
        >
          Game
        </SortableHeader>
      );
    },
    cell: ({ row }) => (
      <span className="hidden sm:table-cell">{row.getValue('game')}</span>
    ),
  },
  {
    accessorKey: 'author',
    header: () => <span className="hidden sm:inline">Author(s)</span>,
    cell: ({ row }) => (
      <span className="hidden sm:inline">{row.getValue('author')}</span>
    ),
  },
  {
    accessorKey: 'downloadUrl',
    header: undefined,

    cell: ({ row }) => (
      <div className="flex justify-end">
        <a href={row.getValue('downloadUrl')}>
          <Button className="bg-bashprime-yellow">
            <Download data-icon="inline-start" />
            Download
          </Button>
        </a>
      </div>
    ),
  },
];
