import { errorNormalize } from './errorNormalize';
import type { FlattenReturn } from './types';

export type SyncFunction<T> = () => T;

export function tryFunction<T>(syncFn: () => T): FlattenReturn<T> {
    try {
        return [null, syncFn()] as const;
    } catch (err) {
        return [errorNormalize(err), undefined] as const;
    }
}
