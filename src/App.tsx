import { QueryClient } from '@tanstack/react-query';
import { Button } from './components/ui/button';

// create query client
const queryClient = new QueryClient();

function App() {
  return (
    <div className="flex flex-col gap-4" id="hint-tracker-page">
      <section id="header" className="flex items-center justify-center gap-2">
        <img src="/icon.png" className="h-20 w-auto" />
        <h1 className="text-bashprime-yellow text-6xl font-bold">
          BashPrime Hint Tracker
        </h1>
      </section>
      <section className="flex justify-center" id="download">
        <a href="#">
          <Button className="bg-bashprime-yellow p-6 text-2xl font-bold">
            Download Now
          </Button>
        </a>
      </section>
      <section>
        <div className="bg-bashprime-yellow h-1.5 w-full" />
        <div className="bg-bashprime-red mt-1 h-1.5 w-full" />
      </section>

      <section id="packs">
        <h2 className="text-4xl font-bold">Packs</h2>
      </section>
    </div>
  );
}

export default App;
