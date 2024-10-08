import { expect, test } from '@jest/globals';
import { add } from '../math';

test('add 2 numbers', () => {
  expect(add(1, 1)).toBe(2);
  expect(add(100, 200)).toBe(300);
});

test('throws an error when arguments are not numbers', () => {
  expect(() => add(1, '1')).toThrow('Pass only numbers!');
  expect(() => add(false, '1')).toThrow('Pass only numbers!');
  expect(() => add('2', '1')).toThrow('Pass only numbers!');
});