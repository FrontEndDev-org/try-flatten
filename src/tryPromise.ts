import { normalizeError } from './normalize-error';
import type { FlattenReturn } from './types/return';

export function tryPromise<T>(promise: PromiseLike<T>): PromiseLike<FlattenReturn<T>> {
  return promise.then(
    (res) => [null, res] as const,
    (err) => [normalizeError(err), undefined] as const
  );
}
