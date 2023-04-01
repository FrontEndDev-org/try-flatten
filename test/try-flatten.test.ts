import { describe, expect, test } from 'vitest';
import { CallbackFunction, tryCallbackFlatten, tryFlatten, tryPromiseFlatten } from '../src';
import { assertError, assertNull, assertNumber, assertUndefined } from './helpers';

describe('tryFlatten + syncFunction', () => {
  test('resolved', () => {
    const [err, res] = tryFlatten(() => 1);

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

  test('rejected', () => {
    const [err, res] = tryFlatten(() => {
      throw 1;
    });

    if (err) {
      assertError(err);
      assertUndefined(res);
    } else {
      assertNull(err);
      assertUndefined(res);
    }

    expect(err?.message).toBe('1');
    expect(res).toBeUndefined();
  });
});

describe('tryFlatten + callbackFunction', () => {
  test('resolved', async () => {
    const callbackFunction: CallbackFunction<number> = (callback) => {
      setTimeout(() => {
        callback(null, 1);
      });
    };
    const [err, res] = await tryFlatten(callbackFunction);

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
    const [err, res] = await tryFlatten(callbackFunction);

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

describe('tryFlatten + promiseLike', () => {
  test('resolved', async () => {
    const [err, res] = await tryFlatten(Promise.resolve(1));

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
    const [err, res] = await tryFlatten(Promise.reject(1));

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
