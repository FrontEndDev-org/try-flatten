import { describe, expect, test } from 'vitest';
import { trySyncFlatten } from '../src';
import { assertError, assertNull, assertNumber, assertUndefined } from './helpers';

describe('trySyncFlatten', () => {
  test('resolved', () => {
    const [err, res] = trySyncFlatten(() => 1);

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
    const [err, res] = trySyncFlatten(() => {
      throw 1;
    });

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
