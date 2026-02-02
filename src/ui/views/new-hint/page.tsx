import { Grid, GridConfigSchema } from '../grid';

export function NewHintPage() {
  const jsonData = GridConfigSchema.parse({
    columns: 30,
    gap: 'md',
    // items: [{ id: '1', colSpan: 2 }, { id: '2' }, { id: '3' }],
    items: Array.from(Array(30).keys()).map((item) => ({
      id: item.toString(),
    })),
    className: 'h-full'
  });
  return <Grid data={jsonData} />;
}
