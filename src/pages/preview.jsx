import React from 'react';

import usePullRequestQuickstart from '../hooks/usePullRequestQuickstart';

import PropTypes from 'prop-types';

const PreviewPage = ({ location }) => {
  const contentFiles = usePullRequestQuickstart(location);

  // To console log the results as part of AC
  // TODO: Remove/refactor this in parsing implementation
  console.log('Parsed quickstart content:', contentFiles);


  return <span>oh hai</span>;
};

PreviewPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PreviewPage;
