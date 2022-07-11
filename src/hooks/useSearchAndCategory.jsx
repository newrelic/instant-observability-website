import { useEffect, useState } from 'react';
import { useTessen } from '@newrelic/gatsby-theme-newrelic';
import { navigate, useLocation } from '@reach/router';
import CATEGORIES from '@data/instant-observability-categories';

const useSearchAndCategory = () => {
  const tessen = useTessen();
  const location = useLocation();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  // used to update search and category values
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const categoryParam = params.get('category');
    const validCategory = CATEGORIES.some((cat) => cat.value === categoryParam);

    setSearch(searchParam);
    setCategory(categoryParam && validCategory ? categoryParam : '');
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
   * Updates search parameter from location
   * @param {String} value to update search term
   */
  const handleSearch = (value) => {
    if (value !== null && value !== undefined && value !== '') {
      const params = new URLSearchParams(location.search);
      params.set('search', value);

      navigate(`?${params.toString()}`);
    } else {
      const params = new URLSearchParams(location.search);
      params.delete('search');

      navigate(location.pathname);
    }
  };

  /**
   * Updates category parameter from location
   * @param {String} value to update category term
   */
  const handleCategory = (value) => {
    if (value !== null && value !== undefined && value !== '') {
      const params = new URLSearchParams(location.search);
      params.set('category', value);

      navigate(`?${params.toString()}`);
    } else {
      const params = new URLSearchParams(location.search);
      params.delete('category');

      navigate(location.pathname);
    }
  };

  return { search, category, handleSearch, handleCategory };
};

export default useSearchAndCategory;
