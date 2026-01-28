import { useAtomValue } from 'jotai';
import './App.css';
import { activePresetState } from './states/App.states';
import { PresetSelector } from './views/preset-selector';

function App() {
  const activePreset = useAtomValue(activePresetState);
  return <>{!activePreset && <PresetSelector />}</>;
}

export default App;
