import { atom } from 'jotai';
import './App.css';
import { HintInput } from './types/hint.types';
import { HintPanel } from './views/hint-panel';

const keysState = atom<HintInput[]>([
  {
    id: '4ed16886-9dff-449f-bf2f-c8964c0614e0',
    name: 'Key 1',
    type: 'location',
    item: null,
    location: atom(''),
    checked: atom(false),
  },
  {
    id: 'edeafd24-d7da-4dce-9ecc-475a1b61c87c',
    name: 'Key 2',
    type: 'location',
    item: null,
    location: atom(''),
    checked: atom(false),
  },
  {
    id: 'ad27f803-8bc1-479d-9014-a0c47c716e2f',
    name: 'Key 3',
    type: 'location',
    item: null,
    location: atom(''),
    checked: atom(false),
  },
]);

const hintsState = atom<HintInput[]>([
  {
    id: '15137a69-6a9e-43a6-a103-ff5d04c22f83',
    name: 'Portal Terminal',
    type: 'item-location',
    item: atom(''),
    location: atom(''),
    checked: atom(false),
  },
  {
    id: '2885cec7-b4bb-4280-b90d-98f3cb8a15be',
    name: 'Agon Energy Controller',
    type: 'item-location',
    item: atom(''),
    location: atom(''),
    checked: atom(false),
  },
  {
    id: '9e1cf4d1-f881-41bd-a39e-d06ef0881dde',
    name: 'Mining Plaza',
    type: 'item-location',
    item: atom(''),
    location: atom(''),
    checked: atom(false),
  },
]);

function App() {
  return (
    <div className="flex gap-4">
      <HintPanel header="Keys" atom={keysState} />
      <HintPanel header="Agon Wastes" atom={hintsState} />
    </div>
  );
}

export default App;
