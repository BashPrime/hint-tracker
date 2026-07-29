import { QueryClient } from "@tanstack/react-query";
import { Button } from "./components/ui/button";

// create query client
const queryClient = new QueryClient();

function App() {
  return (
    <div className="flex flex-col gap-4" id="hint-tracker-page">
      <section id="header" className="flex gap-2 items-center justify-center">
        <img src="/icon.png" className="w-auto h-20" />
        <h1 className="text-6xl font-bold text-bashprime-yellow">
          BashPrime Hint Tracker
        </h1>
      </section>
      <section className="flex justify-center" id="download">
        <a href="#">
          <Button className="font-bold bg-bashprime-yellow text-2xl p-6">
            Download Now
          </Button>
        </a>
      </section>
      <section>
        <div className="bg-bashprime-yellow h-1.5 w-full" />
        <div className="bg-bashprime-red h-1.5 w-full mt-1" />
      </section>

      <section id="packs">
        <h2 className="text-4xl font-bold">Packs</h2>
      </section>
    </div>
  );
}

export default App;
