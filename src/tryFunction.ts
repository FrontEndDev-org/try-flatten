import { normalizeError } from './normalize-error';
import type { FlattenReturn } from './types/return';

export type SyncFunction<T> = () => T;

export function tryFunction<T>(syncFn: () => T): FlattenReturn<T> {
  try {
    return [null, syncFn()] as const;
  } catch (err) {
    return [normalizeError(err), undefined] as const;
  }
}
