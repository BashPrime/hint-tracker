import { cn } from '@/lib/utils';
import {
  Hint,
  HintCollection,
  HintPanel as HintPanelType,
} from '@/types/layout.types';
import { HintPanelContent } from './panel-content';

type Props = {
  panel: HintPanelType;
};

export function HintPanel({ panel }: Props) {
  function isArray(content: any): content is Array<Hint | HintCollection> {
    return Array.isArray(content);
  }

  return (
    <div
      style={{
        borderLeft: panel.lineColor ? `2px solid ${panel.lineColor}` : 'none',
      }}
      className="grow"
      data-name="hint-panel"
    >
      {panel.header && (
        <p className="bg-zinc-400 p-1 text-lg font-bold uppercase dark:bg-zinc-900">
          {panel.header}
        </p>
      )}
      <div
        style={{
          gridTemplateColumns: panel.numColumns
            ? `repeat(${panel.numColumns}, minmax(0, 1fr))`
            : 'unset',
        }}
        className={cn(panel.numColumns && 'grid')}
      >
        {isArray(panel.content) &&
          panel.content.map((contentItem) => (
            <HintPanelContent content={contentItem} />
          ))}
        {!isArray(panel.content) && (
          <HintPanelContent content={panel.content} />
        )}
      </div>
    </div>
  );
}
