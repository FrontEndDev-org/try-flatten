import { errorNormalize } from './errorNormalize';
import type { FlattenReturn } from './types';

export function tryPromise<T>(promise: PromiseLike<T>): PromiseLike<FlattenReturn<T>> {
    return promise.then(
        (res) => [null, res] as const,
        (err) => [errorNormalize(err), undefined] as const,
    );
}
