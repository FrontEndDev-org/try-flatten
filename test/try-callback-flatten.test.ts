import { describe, expect, test } from 'vitest';
import { CallbackFunction, tryCallbackFlatten } from '../src';
import { assertError, assertNull, assertNumber, assertUndefined } from './helpers';

describe('tryCallbackFlatten', () => {
  test('resolved', async () => {
    const callbackFunction: CallbackFunction<number> = (callback) => {
      setTimeout(() => {
        callback(null, 1);
      });
    };
    const [err, res] = await tryCallbackFlatten(callbackFunction);

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
    const callbackFunction: CallbackFunction<number> = (callback) => {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        callback(new Error('1'));
      });
    };
    const [err, res] = await tryCallbackFlatten(callbackFunction);

    if (err) {
      assertError(err);
      assertUndefined(res);
    } else {
      assertNull(err);
      assertNumber(res);
    }

    expect(err?.message).toBe('1');
    expect(res).toBe(null);
  });
});
