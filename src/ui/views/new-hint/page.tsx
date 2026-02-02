
export function NewHintPage() {
  // const jsonData = GridConfigSchema.parse({
  //   columns: 30,
  //   gap: 'md',
  //   // items: [{ id: '1', colSpan: 2 }, { id: '2' }, { id: '3' }],
  //   items: Array.from(Array(30).keys()).map((item) => ({
  //     id: item.toString(),
  //   })),
  //   className: 'h-full'
  // });
  // return <Grid data={jsonData} />;
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3">
      <div className="bg-lime-800">
        <p className="bg-neutral-900 uppercase">Sky Temple Keys</p>
        <p>Key</p>
        <p>Key</p>
        <p>Key</p>
        <p>Key</p>
        <p>Key</p>
        <p>Key</p>
        <p>Key</p>
        <p>Key</p>
        <p>Key</p>
      </div>
      <div className="bg-orange-800">
        <p className="bg-neutral-900 uppercase">Agon Wastes</p>
        <div className="grid md:grid-cols-2">
          <p>Amorbis</p>
          <div>
            <p>Key</p>
            <p>Key</p>
            <p>Key</p>
          </div>
        </div>
        <div>
          <p>Cache</p>
          <p>Cache</p>
        </div>
        <div>
          <p>Translator</p>
          <p>Translator</p>
          <p>Translator</p>
          <p>Translator</p>
          <p>Translator</p>
        </div>
      </div>
      <div className="bg-green-800">
        <p className="bg-neutral-900 uppercase">Torvus Bog</p>
        <div className="grid md:grid-cols-2">
          <p>Chykka</p>
          <div>
            <p>Key</p>
            <p>Key</p>
            <p>Key</p>
          </div>
        </div>
        <div>
          <p>Cache</p>
          <p>Cache</p>
        </div>
        <div>
          <p>Translator</p>
          <p>Translator</p>
          <p>Translator</p>
          <p>Translator</p>
          <p>Translator</p>
        </div>
      </div>
    </div>
  )
}
