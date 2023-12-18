import { expect, test } from 'vitest';
import { errorNormalize } from '../src';

test('errorNormalize', () => {
    expect(errorNormalize(1).message).toBe('1');
    expect(errorNormalize('1').message).toBe('1');
    expect(errorNormalize(null).message).toBe('');
    expect(errorNormalize(undefined).message).toBe('');
    expect(errorNormalize(true).message).toBe('true');
    const err1 = new Error('1');
    const err2 = errorNormalize(err1);
    expect(err2).toBe(err1);
});
