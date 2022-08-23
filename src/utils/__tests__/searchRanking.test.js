'use strict';
import {
  rank,
  exactMatch,
  startsWith,
  containsWord,
  containsSubString,
  getTitle,
  getKeywords,
  getDescription,
  ruleScore,
} from '../searchRanking';

describe('searchRanking', () => {
  describe('matchers', () => {
    describe('exactMatch', () => {
      test('handles null values', () => {
        expect(exactMatch(null, 'hello')).toBe(false);
        expect(exactMatch('hello', null)).toBe(false);
      });

      test('handles undefined values', () => {
        expect(exactMatch(undefined, 'hello')).toBe(false);
        expect(exactMatch('hello', undefined)).toBe(false);
      });

      test('matches exactly', () => {
        expect(exactMatch('hello', 'hello')).toBe(true);
      });

      test('matches case', () => {
        expect(exactMatch('Hello', 'hello')).toBe(false);
      });

      test('does not match substring', () => {
        expect(exactMatch('hello', 'hel')).toBe(false);
      });
    });

    describe('startsWith', () => {
      test('handles null values', () => {
        expect(startsWith(null, 'hello')).toBe(false);
        expect(startsWith('hello', null)).toBe(false);
      });

      test('handles undefined values', () => {
        expect(startsWith(undefined, 'hello')).toBe(false);
        expect(startsWith('hello', undefined)).toBe(false);
      });

      test('matches full value', () => {
        expect(startsWith('hello', 'hello')).toBe(true);
      });

      test('matches start of string', () => {
        expect(startsWith('hello', 'hel')).toBe(true);
      });

      test('does not match substring', () => {
        expect(startsWith('hello', 'ell')).toBe(false);
      });
    });

    describe('containsWord', () => {
      test('handles null values', () => {
        expect(containsWord(null, 'hello')).toBe(false);
        expect(containsWord('hello', null)).toBe(false);
      });

      test('handles undefined values', () => {
        expect(containsWord(undefined, 'hello')).toBe(false);
        expect(containsWord('hello', undefined)).toBe(false);
      });

      test('matches word with surrounding spaces', () => {
        expect(containsWord('hi hello world', 'hello')).toBe(true);
      });

      test('matches start of string', () => {
        expect(containsWord('hello world', 'hello')).toBe(true);
      });

      test('matches end of string', () => {
        expect(containsWord('hello world', 'world')).toBe(true);
      });

      test('does not match substring', () => {
        expect(containsWord('hihelloworld', 'hello')).toBe(false);
      });

      test('escapes regex characters in search string', () => {
        expect(containsWord('hi hello world', 'hello(/[]')).toBe(false);
        expect(containsWord('hi hello world', '^hello$')).toBe(false);
        expect(containsWord('hi hello world', '^he/llo$')).toBe(false);
        expect(containsWord('hi hello world', '^he/l(lo)$')).toBe(false);
        expect(containsWord('hi hello world', '^he[a-z]$')).toBe(false);
        expect(containsWord('hi hello world', '^he[0-9]$')).toBe(false);
      });
    });

    describe('containsSubString', () => {
      test('handles null values', () => {
        expect(containsSubString(null, 'hello')).toBe(false);
        expect(containsSubString('hello', null)).toBe(false);
      });

      test('handles undefined values', () => {
        expect(containsSubString(undefined, 'hello')).toBe(false);
        expect(containsSubString('hello', undefined)).toBe(false);
      });

      test('matches word with surrounding spaces', () => {
        expect(containsSubString('hi hello world', 'hello')).toBe(true);
      });

      test('matches start of string', () => {
        expect(containsSubString('hello world', 'hello')).toBe(true);
      });

      test('matches end of string', () => {
        expect(containsSubString('hello world', 'world')).toBe(true);
      });

      test('matches substring', () => {
        expect(containsSubString('hihelloworld', 'hello')).toBe(true);
      });
    });
  });

  describe('getters', () => {
    describe('getTitle', () => {
      test('returns title if it exists', () => {
        const qs = {
          title: 'test',
        };

        expect(getTitle(qs)).toEqual('test');
      });

      test('returns empty string if title does not exist', () => {
        expect(getTitle({})).toEqual('');
      });
    });

    describe('getKeywords', () => {
      test('returns keywords if they exists', () => {
        const qs = {
          keywords: ['test', 'test2'],
        };

        expect(getKeywords(qs)).toEqual(['test', 'test2']);
      });

      test('returns empty array if keywords do not exist', () => {
        expect(getKeywords({})).toEqual([]);
      });
    });
    describe('getDescription', () => {
      test('returns description if it exists', () => {
        const qs = {
          description: 'test description',
        };

        expect(getDescription(qs)).toEqual('test description');
      });

      test('returns empty string if the description does not exist', () => {
        expect(getDescription({})).toEqual('');
      });
    });
  });

  describe('ranking', () => {
    describe('ruleScore', () => {
      test('returns correct score for index', () => {
        // current ruleset has 7 rules
        expect(ruleScore(0)).toBe(49);
        expect(ruleScore(1)).toBe(36);
        expect(ruleScore(2)).toBe(25);
        expect(ruleScore(3)).toBe(16);
        expect(ruleScore(4)).toBe(9);
        expect(ruleScore(5)).toBe(4);
        expect(ruleScore(6)).toBe(1);
      });
    });

    describe('rank', () => {
      test('empty search string', () => {
        const qs = {
          title: 'test',
          description: 'testestest',
          keywords: [],
        };
        // this is a weird case since the empty string can match a lot of stuff
        // it isn't a huge problem regarding actual search ranking since we won't be applying
        // searches for the empty string
        //
        // matches rules
        // title - startsWith
        // title - containsWord
        // title - containsSubString
        // description - containsWord
        // description - containsSubString
        expect(rank(qs, '')).toEqual(75);
      });

      test('handles undefined search string', () => {
        const qs = {
          title: 'test',
          description: 'testestest',
          keywords: [],
        };
        expect(rank(qs, undefined)).toEqual(0);
      });

      test('ranks title higher', () => {
        const qs = {
          title: 'test',
          description: '',
          keywords: [],
        };
        const qs2 = {
          title: 'blah',
          description: 'test',
          keywords: [],
        };
        expect(rank(qs, 'test')).toBeGreaterThan(rank(qs2, 'test'));
      });

      test('ranks keywords', () => {
        const qs = {
          title: 'test',
          description: '',
          keywords: ['banana', 'watermelon'],
        };
        expect(rank(qs, 'banana')).toBe(16);
      });

      test('trims search term', () => {
        const qs = {
          title: 'test',
          description: '',
          keywords: ['banana', 'watermelon'],
        };
        expect(rank(qs, '   banana        ')).toBe(16);
      });
    });
  });
});
