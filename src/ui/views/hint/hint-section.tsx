import { HintSection as HintSectionType } from '@/types/hint-layout.types';
import { HintContainer } from './hint-container';

type Props = {
  section: HintSectionType;
};

export function HintSection({ section }: Props) {
  return (
    <section className="flex flex-col gap-2 bg-slate-800">
      {section.header && (
        <p className="bg-slate-900 uppercase font-semibold text-lg p-1">{section.header}</p>
      )}
      {section.content.map((container, idx) => (
        <HintContainer key={`container-${idx}`} container={container} />
      ))}
    </section>
  );
}
