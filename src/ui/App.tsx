import { useAtomValue } from 'jotai';
import './App.css';
import { useHintLayoutBuilder } from './hooks/useHintLayoutBuilder';
import { useIpcHandlers } from './hooks/useIpcHandlers';
import { useThemeChanger } from './hooks/useThemeChanger';
import { activePresetState, userAppearanceState } from './states/App.states';
import { HintPage } from './views/hint/page';
import { PresetSelector } from './views/preset-selector';

function App() {
  // !STATE
  const activePreset = useAtomValue(activePresetState);
  const userAppearance = useAtomValue(userAppearanceState);

  // !HOOKS
  useIpcHandlers();
  useThemeChanger();
  useHintLayoutBuilder();

  return (
    <>
      <p>User: {userAppearance}</p>
      {!activePreset && <PresetSelector />}
      {activePreset && <HintPage />}
    </>
  );
}

export default App;
