export function NewHintPage() {
  return (
    // Grid
    <div className="grid sm:grid-cols-1 md:grid-cols-4" data-name="grid-parent">
      {/* Column 1*/}
      <div className="border-l-2 border-lime-500 bg-neutral-800">
        <div className="bg-neutral-800" data-name="panel-stks">
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
        <div
          className="border-l-2 border-lime-500 bg-neutral-800"
          data-name="panel-stks"
        >
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
      </div>
      {/* Column 2 */}
      <div
        className="border-l-2 border-lime-500 bg-neutral-800"
        data-name="panel-stks"
      >
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
      <div className="bg-orange-800" data-name="panel-agon">
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
      <div className="bg-green-800" data-name="panel-torvus">
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
  );
}
