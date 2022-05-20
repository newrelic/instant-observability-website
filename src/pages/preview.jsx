import React from 'react';
import PropTypes from 'prop-types';
import QuickstartDetails from '../templates/QuickstartDetails.js';
import { Spinner } from '@newrelic/gatsby-theme-newrelic';
import usePullRequestQuickstart from '../hooks/usePullRequestQuickstart';
import useLocalhostQuickstart from '../hooks/useLocalhostQuickstart';

const PreviewPage = ({ location }) => {
  const urlParams = new URLSearchParams(location.search);
  let contentFiles;

  if (urlParams.get('local')) {
    contentFiles = useLocalhostQuickstart(location);
  } else {
    contentFiles = usePullRequestQuickstart(location);
  }

  const data = { quickstarts: contentFiles };
  console.log(data);
  return !contentFiles ? <Spinner /> : <QuickstartDetails data={data} location={location} />;
};

PreviewPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PreviewPage;
