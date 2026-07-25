export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function getErrorMsg(err: any) {
  if (err instanceof Error) {
    return err.message;
  }

  return String(err);
}

export function isWayland() {
  // Only relevant if on linux
  if (process.platform !== 'linux') {
    return false;
  }

  // If linux, check the env vars
  return (
    process.env.XDG_SESSION_TYPE === 'wayland' ||
    Boolean(process.env.WAYLAND_DISPLAY)
  );
}
