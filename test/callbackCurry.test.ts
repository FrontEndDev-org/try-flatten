import { callbackCurry } from '../src';
import type { Callback } from '../src';
import { assertNumber } from './helpers';

test('0 input + 0 result', () => {
    const cf = (cb: Callback) => {
        cb(null);
    };
    const fn = vi.fn();
    const cc = callbackCurry(cf);
    cc((err, res) => {
        fn(res);
    });
    expect(fn.mock.calls[0][0]).toBe(undefined);
});

test('0 input + 1 result', () => {
    const cf = (cb: Callback<number>) => {
        cb(null, 0);
    };
    const fn = vi.fn();
    const cc = callbackCurry(cf);
    cc((err, res) => {
        assertNumber(res);
        fn(res);
    });
    expect(fn.mock.calls[0][0]).toBe(0);
});

test('1 input + 0 result', async () => {
    const cf = (a: string, cb: Callback) => {
        cb();
    };
    const fn = vi.fn();
    const cc = callbackCurry(cf, '');
    cc(() => {
        fn();
    });
    expect(fn.mock.calls[0][0]).toBe(undefined);
});

test('1 input + 1 result', async () => {
    const cf = (a: string, cb: Callback<number>) => {
        cb(null, 0);
    };
    const fn = vi.fn();
    const cc = callbackCurry(cf, '');
    cc((err, res) => {
        assertNumber(res);
        fn(res);
    });
    expect(fn.mock.calls[0][0]).toBe(0);
});

test('2 input + 0 result', async () => {
    const cf = (a: string, b: 'ba' | 'bb', cb: Callback) => {
        cb(undefined);
    };
    const fn = vi.fn();
    const cc = callbackCurry(cf, '', 'ba');
    cc(() => {
        fn();
    });
    expect(fn.mock.calls[0][0]).toBe(undefined);
});

test('2 input + 1 result', async () => {
    const cf = (a: string, b: 'ba' | 'bb', cb: Callback<number>) => {
        cb(null, 0);
    };
    const fn = vi.fn();
    const cc = callbackCurry(cf, '', 'ba');
    cc((err, res) => {
        assertNumber(res);
        fn(res);
    });
    expect(fn.mock.calls[0][0]).toBe(0);
});
