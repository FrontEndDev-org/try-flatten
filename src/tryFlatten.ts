import type { CallbackFunction0 } from './callbackCurry';
import { tryCallback } from './tryCallback';
import { tryPromise } from './tryPromise';
import { tryFunction, type SyncFunction } from './tryFunction';
import type { FlattenReturn } from './types';

export type FlattenAble<T> = SyncFunction<T> | CallbackFunction0<T> | PromiseLike<T>;

export function tryFlatten<T>(flattenAble: SyncFunction<T>): FlattenReturn<T>;
export function tryFlatten<T>(flattenAble: CallbackFunction0<T> | PromiseLike<T>): Promise<FlattenReturn<T>>;
export function tryFlatten<T>(flattenAble: FlattenAble<T>): unknown {
    if ('then' in flattenAble) {
        return tryPromise<T>(flattenAble);
    }

    if (flattenAble.length === 0) {
        return tryFunction<T>(flattenAble as SyncFunction<T>);
    }

    return tryCallback<T>(flattenAble);
}
