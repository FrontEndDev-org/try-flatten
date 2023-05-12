export function errorNormalize(error: unknown): Error {
  if (error && error instanceof Error) return error;
  return new Error(String(error ?? ''));
}

export { errorNormalize as normalizeError };
