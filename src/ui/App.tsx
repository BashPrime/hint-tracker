import { useAtomValue } from 'jotai';
import './App.css';
import { useHintLayoutBuilder } from './hooks/useHintLayoutBuilder';
import { useIpcHandlers } from './hooks/useIpcHandlers';
import { activePresetState } from './states/App.states';
import { HintPage } from './views/hint/page';
import { PresetSelector } from './views/preset-selector';

function App() {
  // !STATE
  const activePreset = useAtomValue(activePresetState);

  // !HOOKS
  useIpcHandlers();
  useHintLayoutBuilder();

  return (
    <>
      {!activePreset && <PresetSelector />}
      {activePreset && <HintPage />}
    </>
  );
}

export default App;
