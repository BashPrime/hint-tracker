import { useAtomValue } from 'jotai';
import './App.css';
import { useAppearance } from './hooks/useAppearance';
import { useHintLayoutBuilder } from './hooks/useHintLayoutBuilder';
import { useIpcHandlers } from './hooks/useIpcHandlers';
import { activePresetState, appearanceState } from './states/App.states';
import { HintPage } from './views/hint/page';
import { PresetSelector } from './views/preset-selector';

function App() {
  // !STATE
  const activePreset = useAtomValue(activePresetState);
  const appearance = useAtomValue(appearanceState);

  // !HOOKS
  useIpcHandlers();
  useAppearance();
  useHintLayoutBuilder();

  return (
    <>
      <p>{appearance}</p>
      {!activePreset && <PresetSelector />}
      {activePreset && <HintPage />}
    </>
  );
}

export default App;
