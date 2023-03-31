export function normalizeError(error: unknown): Error {
  if (error && error instanceof Error) return error;
  return new Error(String(error ?? ''));
}
