import { callbackCurry } from '../src/callbackCurry';
import type { Callback } from '../src/callbackCurry';
import { assertNumber } from './helpers';

test('0', () => {
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

test('1', async () => {
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

test('', async () => {
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
