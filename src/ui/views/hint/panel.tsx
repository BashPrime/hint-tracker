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
    <div data-name="hint-panel">
      {isArray(panel.content) &&
        panel.content.map((contentItem) => (
          <HintPanelContent content={contentItem} />
        ))}
      {!isArray(panel.content) && <HintPanelContent content={panel.content} />}
    </div>
  );
}
