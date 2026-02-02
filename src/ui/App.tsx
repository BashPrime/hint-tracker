import './App.css';
import { useHintLayoutBuilder } from './hooks/useHintLayoutBuilder';
import { useIpcHandlers } from './hooks/useIpcHandlers';
import { useThemeChanger } from './hooks/useThemeChanger';
import { NewHintPage } from './views/new-hint/page';

function App() {
  // !STATE
  // const activePreset = useAtomValue(activePresetState);

  // !HOOKS
  useIpcHandlers();
  useThemeChanger();
  useHintLayoutBuilder();

  return (
    <>
      {/* {!activePreset && <PresetSelector />}
      {activePreset && <HintPage />} */}
      <NewHintPage />
    </>
  );
}

export default App;
