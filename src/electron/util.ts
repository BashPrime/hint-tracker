export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function getErrorMsg(err: any) {
  if (err instanceof Error) {
    return err.message;
  }

  return String(err);
}
