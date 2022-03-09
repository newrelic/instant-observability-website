import React from 'react';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import Select from './Select';

const QuickstartSort = ({ className, location }) => {
  const params = new URLSearchParams(location.search);
  const sortParam = params.get('sort');
  const handleChange = (event) => {
    params.set('sort', event.target.value);
    navigate(`?${params.toString()}`);
  };
  return (
    <>
      <Select
        className={className}
        onChange={handleChange}
        name="catalog-sort"
        value={sortParam || 'RELEVANCE'}
      >
        <option value="ALPHABETICAL">Alphabetical</option>
        <option value="POPULARITY">Popularity</option>
        <option value="RELEVANCE">Relevance</option>
        <option value="REVERSE_ALPHABETICAL">Reverse Alphabetical</option>
      </Select>
    </>
  );
};

QuickstartSort.propTypes = {
  className: PropTypes.string,
  location: PropTypes.object,
};
export default QuickstartSort;
