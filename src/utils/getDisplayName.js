import CATEGORIES from '@data/instant-observability-categories';

/**
   * Finds display name for selected category.
   * @returns {String} Display name for results found.
   */
 const getDisplayName = (category) => {
  const found = CATEGORIES.find((cat) => cat.value === category);

  if (!found || !found.value) return 'All quickstarts';

  return found.displayName;
};

export default getDisplayName;
