import { describe, expect, test } from 'bun:test';
import { isAbsolutePath, normalizePath, samePath } from './path.ts';

describe('path', () => {
  test('normalizes trailing and duplicate slashes', () => {
    expect(normalizePath('/a/b/')).toBe('/a/b');
    expect(normalizePath('/a//b///')).toBe('/a/b');
    expect(normalizePath('/')).toBe('/');
    expect(normalizePath('  /a/b  ')).toBe('/a/b');
  });
  test('converts windows separators', () => {
    expect(normalizePath('C:\\Users\\me\\')).toBe('C:/Users/me');
  });
  test('case sensitivity is opt-in', () => {
    expect(samePath('/A/b', '/a/b')).toBe(false);
    expect(samePath('/A/b', '/a/b', { caseInsensitive: true })).toBe(true);
  });
  test('absolute detection', () => {
    expect(isAbsolutePath('/a')).toBe(true);
    expect(isAbsolutePath('C:\\a')).toBe(true);
    expect(isAbsolutePath('~/a')).toBe(false);
    expect(isAbsolutePath('a/b')).toBe(false);
  });
});
