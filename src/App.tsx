import { DownloadsSection } from './views/downloads-section';

function App() {
  return (
    <div className="flex flex-col gap-8" id="hint-tracker-page">
      <section id="header" className="flex items-center justify-center gap-2">
        <img src="/hint-tracker/icon.png" className="h-16 w-auto" />
        <h1 className="text-bashprime-yellow text-4xl font-bold">
          BashPrime Hint Tracker
        </h1>
      </section>
      <DownloadsSection />
      <section id="packs">
        <h2 className="text-2xl font-bold">Packs</h2>
        <p className="text-muted-foreground">Coming Soon!</p>
      </section>
    </div>
  );
}

export default App;
