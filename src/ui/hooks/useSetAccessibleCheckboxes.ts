import { accessibleCheckboxesState } from "@/states/App.states";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export function useSetAccessibleCheckboxes() {
  // !STATE
  const setAccessibleCheckboxes = useSetAtom(accessibleCheckboxesState)

  useEffect(() => {
    // !IPC
    const cleanup = window.electronApi.setAccessibleCheckboxes((enabled) => {
      setAccessibleCheckboxes(enabled);
    });

    // Execute both cleanups when the component unmounts
    return () => {
      cleanup();
    };
  }, [setAccessibleCheckboxes]);
}