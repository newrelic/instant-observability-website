import { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import useTessen from '@newrelic/gatsby-theme-newrelic/src/hooks/useTessen';
import CATEGORIES from '@data/instant-observability-categories';

const isValid = (value) => value !== null && value !== undefined;

const useSearchAndCategory = (location) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const tessen = useTessen();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const categoryParam = params.get('category');
    const validCategory = CATEGORIES.some((cat) => cat.value === categoryParam);
    const isCategoryValid = categoryParam && validCategory;

    setSearch(searchParam || '');
    setCategory(isCategoryValid ? categoryParam : '');
    if (searchParam || categoryParam) {
      tessen.track({
        eventName: 'instantObservability',
        category: 'QuickstartCatalogSearch',
        search: searchParam,
        quickstartCategory: categoryParam,
      });
    }
  }, [location.search, tessen]);

  /**
   * Updates a single query parameter from location
   * @param {String} parameter to set
   * @param {Function => void} callback function to update query parameter
   */
  const handleParam = (param) => (value) => {
    if (isValid(value)) {
      const params = new URLSearchParams(location.search);
      params.set(param, value);

      navigate(`?${params.toString()}`);
    }
  };

  /**
   * Updates two sorting parameters from location
   * @param {String, String} Curried function for params
   * @returns (Function () => void) callback function to update query parameters
   *
   */
  const handleParams = (param1, param2) => (value1, value2) => {
    const params = new URLSearchParams(location.search);
    if (isValid(value1)) {
      params.set(param1, value1);
    }
    if (isValid(value2)) {
      params.set(param2, value2);
    }

    navigate(`?${params.toString()}`);
  };

  return {
    search,
    category,
    setSearch,
    setCategory,
    handleParam,
    handleParams,
  };
};

export default useSearchAndCategory;
