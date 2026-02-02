import { cn } from '@/lib/utils';
import z from 'zod';

export const GridConfigSchema = z.object({
  columns: z.number().min(1),
  gap: z.enum(['sm', 'md', 'lg']),
  items: z.array(
    z.object({
      id: z.string(),
      colSpan: z.number().min(1).optional(),
    })
  ),
  className: z.string().optional(),
});
type GridConfig = z.infer<typeof GridConfigSchema>;

export function Grid({ data }: { data: GridConfig }) {
  const gapClasses = { sm: 'gap-2', md: 'gap-4', lg: 'gap-6' };

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${data.columns}, minmax(0, 1fr))`,
      }}
      className={cn(`grid ${gapClasses[data.gap]}`, data.className)}
    >
      {data.items.map((item) => (
        <div
          key={item.id}
          style={{
            gridColumn: item.colSpan
              ? `span ${item.colSpan} / span ${item.colSpan}`
              : undefined,
          }}
          className={`bg-blue-700 p-4`}
        >
          Item {item.id}
        </div>
      ))}
    </div>
  );
}
