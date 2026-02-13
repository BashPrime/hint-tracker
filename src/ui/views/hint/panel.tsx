import { cn } from '@/lib/utils';
import {
  HintPanelContentTypeSchema,
  HintPanel as HintPanelType,
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
      className={cn('flex h-full flex-col')}
      data-name="hint-panel"
    >
      {panel.header && (
        <p
          className={cn(
            'bg-gray-600 text-neutral-50 dark:bg-neutral-900 dark:text-foreground',
            'px-2 py-1',
            'text-lg font-bold uppercase select-none'
          )}
        >
          {panel.header}
        </p>
      )}
      {parsedContentArr.success &&
        parsedContentArr.data.map((contentItem, idx) => (
          <HintPanelContent content={contentItem} key={`panel-${idx}`} className="mb-2 last:m-0" />
        ))}
      {parsedContentObj.success && (
        <HintPanelContent content={parsedContentObj.data} />
      )}
    </div>
  );
}
