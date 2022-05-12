import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

const GITHUB_API_BASE_URL =
  'https://api.github.com/repos/newrelic/newrelic-quickstarts/contents/quickstarts';

const GITHUB_API_PULL_URL =
  'https://api.github.com/repos/newrelic/newrelic-quickstarts/pulls';

const PreviewPage = ({ location }) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const prNumber = urlParams.get('pr');

    const fetchData = async () => {
      const prResponse = await fetch(
        `${GITHUB_API_PULL_URL}/${prNumber}/files`
      );
      const prResponseJSON = await prResponse.json();

      // In this scenario, we get the quickstart path from the filepath of a dashboard
      // This scenario also works with alerts
      const fileName = prResponseJSON[1].filename
        .split('quickstarts/')[1]
        .split('dashboards/');

      // In this scenario, we get the quickstart path from a file path at the root
      // of the quickstart directory
      const fileNameScenario2 = prResponseJSON[0].filename.split(
        'quickstarts/'
      );

      const branchSHA = prResponseJSON[0].raw_url
        .split('raw/')[1]
        .split('/')[0];

      console.log(branchSHA);
    };

    fetchData();
  }, []);

  // console.log(prNumber);
  // console.log(quickstartPath);
  return <span>oh hai</span>;
};

PreviewPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PreviewPage;
