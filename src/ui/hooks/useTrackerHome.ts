import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export function useTrackerHome() {
  // !HOOKS
  const navigate = useNavigate();

  // !IPC
  useEffect(() => {
    const cleanup = window.electronApi.trackerHome(() => {
      navigate({ to: '/' });
    });

    return () => {
      cleanup();
    };
  }, [navigate]);
}
