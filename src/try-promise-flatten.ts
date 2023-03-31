import { normalizeError } from './normalize-error';

export function tryPromiseFlatten<T>(
  promise: PromiseLike<T>
): PromiseLike<readonly [Error, undefined] | readonly [null, T]> {
  return promise.then(
    (res) => [null, res] as const,
    (err) => [normalizeError(err), undefined] as const
  );
}
