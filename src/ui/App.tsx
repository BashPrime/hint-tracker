import { useAtomValue } from 'jotai';
import './App.css';
import { useIpcHandlers } from './hooks/useIpcHandlers';
import { activePresetState } from './states/App.states';
import { PresetSelector } from './views/preset-selector';

function App() {
  // !STATE
  const activePreset = useAtomValue(activePresetState);

  // !HOOKS
  useIpcHandlers();

  return <>{!activePreset && <PresetSelector />}</>;
}

export default App;
