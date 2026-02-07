import { cn } from '@/lib/utils';
import { activeHintLayoutState } from '@/states/App.states';
import {
  Hint,
  HintCollection,
  HintPanel as HintPanelType,
} from '@/types/layout.types';
import { useAtomValue } from 'jotai';
import { HintPanelContent } from './panel-content';

type Props = {
  panel: HintPanelType;
};

export function HintPanel({ panel }: Props) {
  const layout = useAtomValue(activeHintLayoutState)?.layout;

  function isArray(content: any): content is Array<Hint | HintCollection> {
    return Array.isArray(content);
  }

  return (
    <div
      style={{
        borderLeft: panel.lineColor
          ? `2px solid ${panel.lineColor}`
          : undefined,
      }}
      className={cn('h-full flex flex-col bg-neutral-400/50 dark:bg-[#0e1013]/50')}
      data-name="hint-panel"
    >
      {panel.header && (
        <p className="bg-neutral-400 px-2 py-1 text-lg font-bold uppercase dark:bg-neutral-900">
          {panel.header}
        </p>
      )}
      {isArray(panel.content) &&
        panel.content.map((contentItem) => (
          <HintPanelContent content={contentItem} className="mb-1 last:m-0" />
        ))}
      {!isArray(panel.content) && <HintPanelContent content={panel.content} />}
    </div>
  );
}
