import { cn } from '@/lib/utils';
import {
  HintPanelContentTypeSchema,
  HintPanel as HintPanelType
} from '@/types/layout.types';
import z from 'zod';
import { HintPanelContent } from './panel-content';

type Props = {
  panel: HintPanelType;
};

export function HintPanel({ panel }: Props) {
  const parsedContentArr = z
    .array(HintPanelContentTypeSchema)
    .safeParse(panel.content);
  const parsedContentObj = HintPanelContentTypeSchema.safeParse(panel.content);

  return (
    <div
      style={{
        borderLeft: panel.lineColor
          ? `2px solid ${panel.lineColor}`
          : undefined,
      }}
      className={cn(
        'flex h-full flex-col bg-neutral-400/50 dark:bg-[#0e1013]/50'
      )}
      data-name="hint-panel"
    >
      {panel.header && (
        <p className="bg-neutral-400 px-2 py-1 text-lg font-bold uppercase dark:bg-neutral-900">
          {panel.header}
        </p>
      )}
      {parsedContentArr.success &&
        parsedContentArr.data.map((contentItem) => (
          <HintPanelContent content={contentItem} className="mb-1 last:m-0" />
        ))}
      {parsedContentObj.success && (
        <HintPanelContent content={parsedContentObj.data} />
      )}
    </div>
  );
}
