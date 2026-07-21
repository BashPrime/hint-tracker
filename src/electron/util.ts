export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
export function getErrorMsg(err: any) {
  if (err instanceof Error) {
    return err.message;
  }

  return String(err);
}
