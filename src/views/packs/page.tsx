import packs from '@/data/packs.json';
import { PackSchema } from '@/lib/types';
import z from 'zod';
import { columns } from './columns';
import { DataTable } from './data-table';

function getPacks() {
  return z.array(PackSchema).parse(packs);
}

export function Packs() {
  const data = getPacks();

  return (
    <section id="packs" className="flex flex-col items-center sm:items-start gap-2">
      <h2 className="text-xl sm:text-2xl font-semibold">Packs</h2>
      <DataTable columns={columns} data={data}/>
    </section>
  );
}
