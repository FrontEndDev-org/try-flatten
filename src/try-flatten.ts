import { tryCallbackFlatten, type CallbackFunction } from './try-callback-flatten';
import { tryPromiseFlatten } from './try-promise-flatten';
import { trySyncFlatten, type SyncFunction } from './try-sync-flatten';

export type FlattenAble<T> = SyncFunction<T> | CallbackFunction<T> | PromiseLike<T>;

export function tryFlatten<T>(flattenAble: SyncFunction<T>): [Error, undefined] | [null, T];
export function tryFlatten<T>(
  flattenAble: CallbackFunction<T> | PromiseLike<T>
): Promise<[Error, undefined] | [null, T]>;
export function tryFlatten<T>(flattenAble: FlattenAble<T>): any {
  if ('then' in flattenAble) {
    return tryPromiseFlatten<T>(flattenAble);
  }

  if (flattenAble.length === 0) {
    return trySyncFlatten<T>(flattenAble as SyncFunction<T>);
  }

  return tryCallbackFlatten<T>(flattenAble);
}
