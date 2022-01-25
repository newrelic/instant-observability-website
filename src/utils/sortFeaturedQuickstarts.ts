import { Quickstart } from '../types';

const isFeatured = (quickstart: Quickstart) =>
  quickstart.keywords && quickstart.keywords.includes('featured');

export const sortFeaturedQuickstarts = (quickstarts: Quickstart[]) => {
  const sortedQuickstarts = quickstarts.sort((a, b) => {
    if (isFeatured(a) && !isFeatured(b)) {
      return -1;
    }
    if (isFeatured(b) && !isFeatured(a)) {
      return 1;
    }
    return 0;
  });
  return sortedQuickstarts;
};
