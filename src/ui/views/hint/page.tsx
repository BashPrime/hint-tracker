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
  return (
    <div className="items-top flex flex-col md:flex-row">
      {activeHintLayout.layout.map((section, idx) => (
        <HintSection key={`section-${idx}`} section={section} />
      ))}
    </div>
  );
}
