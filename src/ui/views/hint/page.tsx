import { activeHintLayoutState } from '@/states/App.states';
import { useAtomValue } from 'jotai';
import { HintSection } from './hint-section';

export function HintPage() {
  // !STATE
  const activeHintLayout = useAtomValue(activeHintLayoutState);
  
  if (!activeHintLayout) {
    return (
      <p>That's weird. There's no layout despite you selecting a preset.</p>
    );
  }
  return activeHintLayout.layout.map((section) => (
    <HintSection section={section} />
  ));
}
