import { cn } from '@/lib/utils';
import { HintContainer as HintContainerType } from '@/types/hint-layout.types';
import { Hint } from './hint';

type Props = {
  container: HintContainerType;
};

export function HintContainer({ container }: Props) {
  return (
    <>
      {container.name && (
        <p className={cn(container.color && `text-${container.color}`)}>
          {container.name}
        </p>
      )}
      {container.hints.map((hint, idx) => (
        <Hint hint={hint} />
      ))}
    </>
  );
}
