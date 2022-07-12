import React, { useEffect, useState, useRef } from 'react';
import CATEGORIES from '@data/instant-observability-categories';
import useSearchAndCategory from '@hooks/useSearchAndCategory';

/**
 * Callback function for alphabetical sort.
 * @param {Object} quickstart node
 * @param {Object} quickstart node
 */
const alphaSort = (a, b) => a.title.localeCompare(b.title);

/**
 * Curried function for filtering by keyword
 * @param {Array} array of quickstarts
 * @param {(Function) => Array} Callback function that filters quickstart array
 */
const filterQuickstarts = (quickstarts) => (keyword) =>
  quickstarts.filter((product) => product.keywords.includes(keyword));

/**
 * Custom hook to get filtered quickstarts
 * @param {Array} array of quickstarts
 */
const useFilteredQuickstarts = (quickstarts, search, category) => {
  const filterQuickstartsByKeyword = filterQuickstarts(quickstarts);
  const featuredQuickstarts = filterQuickstartsByKeyword('featured');
  const mostPopularQuickstarts = filterQuickstartsByKeyword('most popular');
  const alphaSortedQuickstarts = quickstarts.sort(alphaSort);

  const [sortedQuickstarts, setSortedQuickstarts] = useState(
    alphaSortedQuickstarts
  );

  const [filteredQuickstarts, setFilteredQuickstarts] = useState(
    sortedQuickstarts
  );
  const [categoriesWithCount, setCategoriesWithCount] = useState(
    sortedQuickstarts
  );

  useEffect(() => {
    /**
     * Determines if one string is a substring of the other, case insensitive
     * @param {String} substring the substring to test against
     * @returns {(Function) => Boolean} Callback function that determines if the argument has the substring
     */
    const stringIncludes = (substring) => (fullstring) =>
      fullstring.toLowerCase().includes(substring.toLowerCase());

    /**
     * Filters a quickstart based on a provided search term.
     * @param {String} search Search term.
     * @returns {(Function) => Boolean} Callback function to be used by filter.
     */
    const filterBySearch = (search) => ({
      title,
      summary,
      description,
      keywords,
    }) => {
      if (!search) {
        return true;
      }

      const searchIncludes = stringIncludes(search);
      return (
        searchIncludes(title) ||
        searchIncludes(summary) ||
        searchIncludes(description) ||
        keywords.some(searchIncludes)
      );
    };

    /**
     * Filters a quickstart based on a category.
     * @param {String} category The category type (e.g. 'featured').
     * @returns {(Function) => Boolean} Callback function to be used by filter.
     */
    const filterByCategory = (category) => {
      const { associatedKeywords = [] } =
        CATEGORIES.find(({ value }) => value === category) || {};

      return (quickstart) =>
        !category ||
        (quickstart.keywords &&
          quickstart.keywords.find((k) => associatedKeywords.includes(k)));
    };

    setFilteredQuickstarts(
      sortedQuickstarts
        .filter(filterBySearch(search))
        .filter(filterByCategory(category))
    );

    setCategoriesWithCount(() =>
      CATEGORIES.map((cat) => ({
        ...cat,
        count: sortedQuickstarts
          .filter(filterBySearch(search))
          .filter(filterByCategory(cat.value)).length,
      }))
    );

    // shifts the codestream quickstart to the front
    // if it is included in the filtered quickstarts
    const shiftCodestream = () => {
      // Hard-code for moving codestream object to front of sortedQuickstarts array
      // hardcoded codestream uuid
      const codestreamIndex = sortedQuickstarts.findIndex(
        ({ id }) => id === '29bd9a4a-1c19-4219-9694-0942f6411ce7'
      );
      if (codestreamIndex > -1) {
        const codestreamObject = sortedQuickstarts[codestreamIndex];
        setSortedQuickstarts((sq) => [
          codestreamObject,
          ...sq.slice(0, codestreamIndex),
          ...sq.slice(codestreamIndex + 1),
        ]);
      }
    };

    if ((!category && !search) || (category === 'featured' && !search)) {
      shiftCodestream();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  return {
    featuredQuickstarts,
    filteredQuickstarts,
    mostPopularQuickstarts,
    categoriesWithCount,
  };
};

export default useFilteredQuickstarts;
