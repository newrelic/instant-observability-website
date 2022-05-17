import React from 'react';
import PropTypes from 'prop-types';

import useLocalhostQuickstart from '../hooks/useLocalhostQuickstart';

const PreviewPage = ({ location }) => {
  const urlParams = new URLSearchParams(location.search);
  let contentFiles;

  if (urlParams.get('local')) {
    contentFiles = useLocalhostQuickstart(location);
  } else {
    //contentFiles = usePullRequestQuickstart(location);
  }

  console.log('Parsed quickstart content:', contentFiles);
  return <span>oh hai</span>;
};

PreviewPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PreviewPage;
