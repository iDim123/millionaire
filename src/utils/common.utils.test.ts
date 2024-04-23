import { formatNumberWithCommas } from './common.utils';

describe('formatNumberWithCommas function', () => {
  test('should return string representation of number with commas for thousands', () => {
    const input = 1000;
    const expectedOutput = '1,000';
    expect(formatNumberWithCommas(input)).toEqual(expectedOutput);
  });

  test('should return string representation of number with commas for millions', () => {
    const input = 1000000;
    const expectedOutput = '1,000,000';
    expect(formatNumberWithCommas(input)).toEqual(expectedOutput);
  });

  test('should return string representation of number with commas for billions', () => {
    const input = 1000000000;
    const expectedOutput = '1,000,000,000';
    expect(formatNumberWithCommas(input)).toEqual(expectedOutput);
  });

  test('should return string representation of number with commas for negative numbers', () => {
    const input = -1000000;
    const expectedOutput = '-1,000,000';
    expect(formatNumberWithCommas(input)).toEqual(expectedOutput);
  });

  test('should return string representation of number with commas for decimal numbers', () => {
    const input = 12345.6789;
    const expectedOutput = '12,345.6789';
    expect(formatNumberWithCommas(input)).toEqual(expectedOutput);
  });
});
