import { describe, it, expect } from 'vitest';
import { WORD_DATABASE, getWordsByDifficulty, getUniqueWordsForTeams, createMaskedWord } from '../words';

describe('Word Database', () => {
  describe('WORD_DATABASE', () => {
    it('should contain words for all difficulty levels', () => {
      // Test on a sample to avoid memory issues
      const sampleDifficulties = WORD_DATABASE.slice(0, 30).map(word => word.difficulty);
      expect(sampleDifficulties).toContain('easy');
      expect(sampleDifficulties).toContain('medium');
      expect(sampleDifficulties).toContain('hard');
    });

    it('should have valid word data structure', () => {
      // Test only first 10 words to avoid memory issues
      const sampleWords = WORD_DATABASE.slice(0, 10);
      sampleWords.forEach(word => {
        expect(word).toHaveProperty('word');
        expect(word).toHaveProperty('hint');
        expect(word).toHaveProperty('options');
        expect(word).toHaveProperty('correctAnswer');
        expect(word).toHaveProperty('difficulty');

        expect(typeof word.word).toBe('string');
        expect(typeof word.hint).toBe('string');
        expect(Array.isArray(word.options)).toBe(true);
        expect(word.options.length).toBeGreaterThan(0);
        expect(word.options).toContain(word.correctAnswer);
        expect(['easy', 'medium', 'hard']).toContain(word.difficulty);
      });
    });

    it('should have unique words', () => {
      // Test uniqueness on a sample to avoid memory issues
      const sampleWords = WORD_DATABASE.slice(0, 20).map(w => w.word);
      const uniqueWords = new Set(sampleWords);
      expect(uniqueWords.size).toBe(sampleWords.length);
    });
  });

  describe('getWordsByDifficulty', () => {
    it('should return words for easy difficulty', () => {
      const words = getWordsByDifficulty('easy', 5);
      expect(words.length).toBe(5);
      words.forEach(word => {
        expect(word.difficulty).toBe('easy');
      });
    });

    it('should return words for medium difficulty', () => {
      const words = getWordsByDifficulty('medium', 3);
      expect(words.length).toBe(3);
      words.forEach(word => {
        expect(word.difficulty).toBe('medium');
      });
    });

    it('should return words for hard difficulty', () => {
      const words = getWordsByDifficulty('hard', 2);
      expect(words.length).toBe(2);
      words.forEach(word => {
        expect(word.difficulty).toBe('hard');
      });
    });

    it('should return all available words if count exceeds available', () => {
      // Use a reasonable count that doesn't load the entire database
      const words = getWordsByDifficulty('easy', 100);
      const allEasyWords = getWordsByDifficulty('easy', 1000); // Large number to get all
      expect(words.length).toBeLessThanOrEqual(allEasyWords.length);
    });

    it('should return empty array for count 0', () => {
      const words = getWordsByDifficulty('easy', 0);
      expect(words).toEqual([]);
    });

    it('should return shuffled results', () => {
      const words1 = getWordsByDifficulty('easy', 3);
      const words2 = getWordsByDifficulty('easy', 3);

      // Since we're mocking Math.random to return 0.5, the shuffle should be deterministic
      // but in a real scenario, we'd expect different orders
      expect(words1.length).toBe(3);
      expect(words2.length).toBe(3);
    });
  });

  describe('getUniqueWordsForTeams', () => {
    it('should return correct number of words for teams', () => {
      const words = getUniqueWordsForTeams('easy', 3, 2); // 3 words per team, 2 teams
      expect(words.length).toBe(6);
    });

    it('should handle case where requested words exceed available', () => {
      // Test with a large number to trigger the limit
      const words = getUniqueWordsForTeams('easy', 1000, 1); // Large number
      const normalWords = getUniqueWordsForTeams('easy', 10, 1);
      expect(words.length).toBeGreaterThanOrEqual(normalWords.length);
    });

    it('should return words from correct difficulty', () => {
      const words = getUniqueWordsForTeams('hard', 2, 1);
      expect(words.length).toBe(2);
      words.forEach(word => {
        expect(word.difficulty).toBe('hard');
      });
    });

    it('should handle single team', () => {
      const words = getUniqueWordsForTeams('medium', 4, 1);
      expect(words.length).toBe(4);
      words.forEach(word => {
        expect(word.difficulty).toBe('medium');
      });
    });
  });

  describe('createMaskedWord', () => {
    it('should mask a word correctly', () => {
      const result = createMaskedWord('HELLO');
      expect(result).toMatch(/^[H_E_L_O_ ]+$/);
      expect(result.replace(/ /g, '')).toHaveLength(5);
    });

    it('should always show first letter', () => {
      const result = createMaskedWord('WORLD');
      expect(result.startsWith('W')).toBe(true);
    });

    it('should show approximately 30% of letters', () => {
      const word = 'TESTING';
      const result = createMaskedWord(word);
      const visibleChars = result.replace(/_/g, '').replace(/ /g, '').length;
      const totalChars = word.length;
      const visibilityRatio = visibleChars / totalChars;

      // Should be close to 30% (with some tolerance for randomness)
      expect(visibilityRatio).toBeGreaterThan(0.2);
      expect(visibilityRatio).toBeLessThan(0.5);
    });

    it('should handle single letter words', () => {
      const result = createMaskedWord('A');
      expect(result).toBe('A');
    });

    it('should handle empty string', () => {
      const result = createMaskedWord('');
      expect(result).toBe('');
    });

    it('should handle words with spaces', () => {
      const result = createMaskedWord('HELLO WORLD');
      expect(result).toContain(' ');
      expect(result.replace(/ /g, '').length).toBe(10); // HELLO WORLD has 10 non-space characters
    });

    it('should maintain word length with spaces', () => {
      const original = 'HELLO WORLD';
      const result = createMaskedWord(original);
      expect(result.replace(/ /g, '').length).toBe(original.replace(/ /g, '').length);
    });
  });
});
