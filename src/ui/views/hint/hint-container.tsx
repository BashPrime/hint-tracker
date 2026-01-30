import { HintContainer as HintContainerType } from '@/types/hint-layout.types';
import { Hint } from './hint';

type Props = {
  container: HintContainerType;
};

export function HintContainer({ container }: Props) {
  return (
    <div data-name="hint-container">
      {container.name && (
        <p style={{ color: container.color }}>{container.name}</p>
      )}
      {container.hints.map((hint, idx) => (
        <Hint key={`hint-${idx}`} hint={hint} />
      ))}
    </div>
  );
}
