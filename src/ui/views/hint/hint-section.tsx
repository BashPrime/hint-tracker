import { cn } from '@/lib/utils';
import { HintSection as HintSectionType } from '@/types/hint-layout.types';

type Props = {
  section: HintSectionType;
};

export function HintSection({ section }: Props) {
  return (
    <>
      {section.header && <p className={cn(`text-${section.header}-400`)}>{section.header}</p>}
      {/* {section.hints.map((hintElem) => {
        if (hintElem.group.length) {

        }
        // const hintWithGroup = HintWithGroupSchema.safeParse(hintElem);
        // const hint = HintSchema.safeParse(hintElem);

        // if (hintWithGroup.success) {
        //   return <HintGroup />;
        // }

        return <p>This is a hint!</p>;
      })} */}
      {section.hints.map((hintElem) => {
        const asdf = hintElem
      })}
    </>
  );
}
