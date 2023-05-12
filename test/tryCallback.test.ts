import { describe, expect, test } from 'vitest';
import type { CallbackFunction0, CallbackFunction1, CallbackFunction2 } from '../src';
import { tryCallback } from '../src';
import { assertError, assertNull, assertNumber, assertUndefined } from './helpers';

describe('tryCallbackFlatten 0 input + 0 result', () => {
  test('resolved', async () => {
    const callbackFunction = (callback: (err: Error | null) => void) => {
      setTimeout(() => {
        callback(null);
      });
    };
    const [err, res] = await tryCallback(callbackFunction);

    if (err) {
      assertError(err);
    } else {
      assertNull(err);
    }

    expect(err).toBe(null);
    expect(res).toBe(undefined);
  });

  test('rejected', async () => {
    const callbackFunction = (callback: (err: Error | null) => void) => {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        callback(new Error('1'));
      });
    };
    const [err, res] = await tryCallback(callbackFunction);

    if (err) {
      assertError(err);
    } else {
      assertNull(err);
    }

    expect(err?.message).toBe('1');
    expect(res).toBeUndefined();
  });
});

describe('tryCallbackFlatten 0 input + 1 result', () => {
  test('resolved', async () => {
    const callbackFunction: CallbackFunction0<number> = (callback) => {
      setTimeout(() => {
        callback(null, 1);
      });
    };
    const [err, res] = await tryCallback(callbackFunction);

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
    const callbackFunction: CallbackFunction0<number> = (callback) => {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        callback(new Error('1'));
      });
    };
    const [err, res] = await tryCallback(callbackFunction);

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

describe('tryCallbackFlatten 1 input + 0 result', () => {
  test('resolved', async () => {
    const callbackFunction: CallbackFunction1<string> = (a, callback) => {
      setTimeout(() => {
        callback(null);
      });
    };
    const [err, res] = await tryCallback(callbackFunction, '');

    if (err) {
      assertError(err);
      assertUndefined(res);
    } else {
      assertNull(err);
    }

    expect(err).toBe(null);
    expect(res).toBeUndefined();
  });

  test('rejected', async () => {
    const callbackFunction: CallbackFunction1<string> = (a, callback) => {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        callback(new Error('1'));
      });
    };
    const [err, res] = await tryCallback(callbackFunction, '');

    if (err) {
      assertError(err);
      assertUndefined(res);
    } else {
      assertNull(err);
    }

    expect(err?.message).toBe('1');
    expect(res).toBeUndefined();
  });
});

describe('tryCallbackFlatten 1 input + 1 result', () => {
  test('resolved', async () => {
    const callbackFunction: CallbackFunction1<string, number> = (a, callback) => {
      setTimeout(() => {
        callback(null, 1);
      });
    };
    const [err, res] = await tryCallback(callbackFunction, '');

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
    const callbackFunction: CallbackFunction1<string, number> = (a, callback) => {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        callback(new Error('1'));
      });
    };
    const [err, res] = await tryCallback(callbackFunction, '');

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

describe('tryCallbackFlatten 2 input + 0 result', () => {
  test('resolved', async () => {
    const callbackFunction = (a: string, b: 'b1' | 'b2', callback: (err: Error | null) => void) => {
      setTimeout(() => {
        callback(null);
      });
    };
    const [err, res] = await tryCallback(callbackFunction, '', 'b1');

    if (err) {
      assertError(err);
      assertUndefined(res);
    } else {
      assertNull(err);
    }

    expect(err).toBe(null);
    expect(res).toBeUndefined();
  });

  test('rejected', async () => {
    const callbackFunction = (a: string, b: 'b1' | 'b2', callback: (err: Error | null) => void) => {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        callback(new Error('1'));
      });
    };
    const [err, res] = await tryCallback(callbackFunction, '', 'b1');

    if (err) {
      assertError(err);
      assertUndefined(res);
    } else {
      assertNull(err);
    }

    expect(err?.message).toBe('1');
    expect(res).toBeUndefined();
  });
});

describe('tryCallbackFlatten 2 input + 1 result', () => {
  test('resolved', async () => {
    const callbackFunction: CallbackFunction2<string, 'b1' | 'b2', number> = (a, b, callback) => {
      setTimeout(() => {
        callback(null, 1);
      });
    };
    const [err, res] = await tryCallback(callbackFunction, '', 'b1');

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
    const callbackFunction: CallbackFunction2<string, 'b1' | 'b2', number> = (a, b, callback) => {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        callback(new Error('1'));
      });
    };
    const [err, res] = await tryCallback(callbackFunction, '', 'b1');

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
