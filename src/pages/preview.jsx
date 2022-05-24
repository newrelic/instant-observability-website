import React from 'react';
import PropTypes from 'prop-types';
import QuickstartDetails from '../templates/QuickstartDetails.js';
import { Spinner } from '@newrelic/gatsby-theme-newrelic';
import useQuickstartPreview from '../hooks/useQuickstartPreview';

const PreviewPage = ({ location }) => {
  // grab all query parameters that can be used for quickstart preview
  const urlParams = new URLSearchParams(location.search);
  const prNumber = urlParams.get('pr');
  const quickstartPath = urlParams.get('quickstart');
  const local = urlParams.get('local');
  const port = urlParams.get('port') || '3000';

  const contentFiles = useQuickstartPreview(
    local,
    port,
    prNumber,
    quickstartPath
  );

  const data = { quickstarts: contentFiles };

  return !contentFiles ? (
    <Spinner />
  ) : (
    <QuickstartDetails data={data} location={location} />
  );
};

PreviewPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PreviewPage;
