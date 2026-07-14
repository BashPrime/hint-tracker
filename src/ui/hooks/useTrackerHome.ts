import { useNavigate } from "@tanstack/react-router";

export function useTrackerHome() {
  // !HOOKS
  const navigate = useNavigate()

  // !IPC
  window.electronApi.trackerHome(() => {
    navigate({ to: '/' })
  });
}