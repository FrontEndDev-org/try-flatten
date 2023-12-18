import type {
    CallbackFunction0,
    CallbackFunction1,
    CallbackFunction2,
    CallbackFunction3,
    CallbackFunction4,
    CallbackFunction5,
    CallbackFunction6,
} from './callbackCurry';
import { callbackCurry } from './callbackCurry';
import { errorNormalize } from './errorNormalize';
import type { FlattenReturn } from './types';

export function tryCallback(cf: CallbackFunction0): Promise<FlattenReturn>;
export function tryCallback<T = void>(cf: CallbackFunction0<T>): Promise<FlattenReturn<T>>;
export function tryCallback<A, T = void>(cf: CallbackFunction1<A, T>, a: A): Promise<FlattenReturn<T>>;
export function tryCallback<A, B, T = void>(cf: CallbackFunction2<A, B, T>, a: A, b: B): Promise<FlattenReturn<T>>;
export function tryCallback<A, B, C, T = void>(
    cf: CallbackFunction3<A, B, C, T>,
    a: A,
    b: B,
    c: C,
): Promise<FlattenReturn<T>>;
export function tryCallback<A, B, C, D, T = void>(
    cf: CallbackFunction4<A, B, C, D>,
    a: A,
    b: B,
    c: C,
    d: D,
): Promise<FlattenReturn<T>>;
export function tryCallback<A, B, C, D, E, T = void>(
    cf: CallbackFunction5<A, B, C, D, E, T>,
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
): Promise<FlattenReturn<T>>;
export function tryCallback<A, B, C, D, E, F, T = void>(
    cf: CallbackFunction6<A, B, C, D, E, F, T>,
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
): Promise<FlattenReturn<T>>;
export function tryCallback(cf: unknown, ...args: unknown[]): Promise<FlattenReturn<unknown>> {
    return new Promise((resolve) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        callbackCurry.apply(this, [cf, ...args])((err, res) => {
            if (err) {
                resolve([errorNormalize(err), undefined] as const);
            } else {
                resolve([null, res] as const);
            }
        });
    });
}
