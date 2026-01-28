import { MouseEvent, useCallback } from 'react';

export default function useRightClick(callback: CallableFunction) {
  // !FUNCTION
  const handleRightClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      // right click
      if (event.nativeEvent.button === 2) {
        event.preventDefault();
        callback();
      }
    },
    [callback]
  );

  return handleRightClick;
}
