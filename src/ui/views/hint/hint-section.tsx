import { cn } from '@/lib/utils';
import { HintSection as HintSectionType } from '@/types/hint-layout.types';

type Props = {
  section: HintSectionType;
};

export function HintSection({ section }: Props) {
  return (
    <>
      {section.header && (
        <p className={cn(`text-${section.header}-400`)}>{section.header}</p>
      )}
      {section.content.map((contentElem) => {})}
    </>
  );
}
