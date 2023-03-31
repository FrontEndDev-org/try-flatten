import { expect, test } from 'vitest';
import { normalizeError } from '../src';

test('normalizeError', () => {
  expect(normalizeError(1).message).toBe('1');
  expect(normalizeError('1').message).toBe('1');
  expect(normalizeError(null).message).toBe('');
  expect(normalizeError(undefined).message).toBe('');
  expect(normalizeError(true).message).toBe('true');
  const err1 = new Error('1');
  const err2 = normalizeError(err1);
  expect(err2).toBe(err1);
});
