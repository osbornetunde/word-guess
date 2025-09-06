import { describe, it, expect } from 'vitest';

// Test the normalization function used in the app
const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');

describe('Utility Functions', () => {
  describe('normalize', () => {
    it('should convert to lowercase', () => {
      expect(normalize('HELLO')).toBe('hello');
      expect(normalize('WORLD')).toBe('world');
    });

    it('should trim whitespace', () => {
      expect(normalize('  hello  ')).toBe('hello');
      expect(normalize('\t\nhello\t\n')).toBe('hello');
    });

    it('should normalize multiple spaces to single space', () => {
      expect(normalize('hello   world')).toBe('hello world');
      expect(normalize('a    b    c')).toBe('a b c');
    });

    it('should remove diacritics', () => {
      expect(normalize('café')).toBe('cafe');
      expect(normalize('naïve')).toBe('naive');
      expect(normalize('résumé')).toBe('resume');
    });

    it('should handle empty strings', () => {
      expect(normalize('')).toBe('');
    });

    it('should handle strings with only whitespace', () => {
      expect(normalize('   ')).toBe('');
      expect(normalize('\t\n')).toBe('');
    });

    it('should handle mixed cases and diacritics', () => {
      expect(normalize('CAFÉ AU LAIT')).toBe('cafe au lait');
      expect(normalize('Naïve résumé')).toBe('naive resume');
    });

    it('should preserve single spaces between words', () => {
      expect(normalize('hello world')).toBe('hello world');
      expect(normalize('this is a test')).toBe('this is a test');
    });
  });
});
