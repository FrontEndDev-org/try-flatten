import { describe, expect, test } from 'vitest';
import { tryPromise } from '../src';
import { assertError, assertNull, assertNumber, assertUndefined } from './helpers';

describe('tryPromiseFlatten', () => {
    test('resolved', async () => {
        const [err, res] = await tryPromise(Promise.resolve(1));

        if (err) {
            assertError(err);
            assertUndefined(res);
        } else {
            assertNull(err);
            assertNumber(res);
        }

        expect(err).toBe(null);
        expect(res).toBe(1);
    });

    test('rejected', async () => {
        const [err, res] = await tryPromise(Promise.reject(1));

        if (err) {
            assertError(err);
            assertUndefined(res);
        } else {
            assertNull(err);
            assertNumber(res);
        }

        expect(err?.message).toBe('1');
        expect(res).toBeUndefined();
    });
});
