type QuickstartPartial = {
  title: string;
  keywords: string[];
  description: string;
};

type Rule = {
  getter: (a: QuickstartPartial) => string | string[];
  matcher: (a: string, b: string) => boolean;
};

const escapeForRegex = (s: string): string =>
  s?.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') ?? s;

export const exactMatch = (s: string, searchString: string): boolean =>
  s === searchString;

export const startsWith = (s: string, searchString: string): boolean =>
  s?.startsWith(searchString) ?? false;

export const containsWord = (s: string, searchString: string): boolean =>
  new RegExp(`\\b${escapeForRegex(searchString)}\\b`).test(s);

export const containsSubString = (s: string, searchString: string): boolean =>
  s?.includes(searchString) ?? false;

export const getTitle = (quickstart: QuickstartPartial): string =>
  quickstart?.title ?? '';

export const getKeywords = (quickstart: QuickstartPartial): string[] =>
  quickstart?.keywords ?? [];

export const getDescription = (quickstart: QuickstartPartial): string =>
  quickstart?.description ?? '';

/**
 * These are the rules used to rank a quickstart based on the search string.
 * Each rule is weighted based on its position in the array.
 * Ex: ruleScore(0) = (7 - 0)^2 = 49
 * Ex: ruleScore(5) = (7 - 5)^2 = 4
 */
const rules: Rule[] = [
  { getter: getTitle, matcher: exactMatch },
  { getter: getTitle, matcher: startsWith },
  { getter: getTitle, matcher: containsWord },
  { getter: getKeywords, matcher: exactMatch },
  { getter: getDescription, matcher: containsWord },
  { getter: getTitle, matcher: containsSubString },
  { getter: getDescription, matcher: containsSubString },
];

export const ruleScore = (index: number): number =>
  Math.pow(rules.length - index, 2);

type RankFuncSignature = (
  quickstart: QuickstartPartial,
  searchString: string
) => number;

/**
 * Returns a numerical value for a quickstart based on the search string
 * for the purposes of ranking search results.
 */
export const rank: RankFuncSignature = (quickstart, searchString) => {
  const total = rules.reduce((score, { getter, matcher }, index) => {
    const quickstartField = getter(quickstart);
    const lowerSearch = searchString?.toLowerCase()?.trim() ?? '';

    const matches = Array.isArray(quickstartField)
      ? quickstartField.some((val) => matcher(val.toLowerCase(), lowerSearch))
      : matcher(quickstartField.toLowerCase(), searchString);

    if (matches) {
      return score + ruleScore(index);
    } else {
      return score;
    }
  }, 0);

  return total;
};
