import React from 'react';

import usePullRequestQuickstart from '../hooks/usePullRequestQuickstart';
import useLocalhostQuickstart from '../hooks/useLocalhostQuickstart';

import PropTypes from 'prop-types';

const PreviewPage = ({ location }) => {
  const urlParams = new URLSearchParams(location.search);
  let contentFiles;
  
  if (urlParams.get('local')) {
    contentFiles = useLocalhostQuickstart(location);
  } else {
    contentFiles = usePullRequestQuickstart(location);
  }
 
  // To console log the results as part of AC
  // TODO: Remove/refactor this in parsing implementation
  console.log('Parsed quickstart content:', contentFiles);

  return <span>oh hai</span>;
};

PreviewPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PreviewPage;
