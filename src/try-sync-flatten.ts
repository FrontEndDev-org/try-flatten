import { normalizeError } from './normalize-error';

export type SyncFunction<T> = () => T;

export function trySyncFlatten<T>(syncFn: () => T): readonly [null, T] | readonly [Error, undefined] {
  try {
    return [null, syncFn()] as const;
  } catch (err) {
    return [normalizeError(err), undefined] as const;
  }
}
