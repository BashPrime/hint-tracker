import { useAtomValue } from 'jotai';
import './App.css';
import { useIpcHandlers } from './hooks/useIpcHandlers';
import { useLayoutBuilder } from './hooks/useLayoutBuilder';
import { useThemeChanger } from './hooks/useThemeChanger';
import { activePresetState } from './states/App.states';
import { Layout } from './views/layout';
import { PresetSelector } from './views/preset-selector';

function App() {
  // !STATE
  const activePreset = useAtomValue(activePresetState);

  // !HOOKS
  useIpcHandlers();
  useThemeChanger();
  useLayoutBuilder();

  return (
    <>
      {!activePreset && <PresetSelector />}
      {activePreset && <Layout />}
      {/* <NewHintPage /> */}
    </>
  );
}

export default App;
