import React from 'react';
import PropTypes from 'prop-types';
import QuickstartDetails from '../templates/QuickstartDetails.js';

import useLocalhostQuickstart from '../hooks/useLocalhostQuickstart';

const testQuickstart = {
  title: 'Title of quickstart',
  slug: 'Slug of quickstart',
  description: 'Description of quickstart',
  packUrl:
    'https://github.com/newrelic/newrelic-quickstarts/tree/main/quickstarts/battlesnake',
  id: '63a65857-a25e-4654-9174-928e5894b3b9',
  level: 'NEW_RELIC',
  logoUrl:
    'https://raw.githubusercontent.com/newrelic/newrelic-quickstarts/main/_template/logo.svg',
  summary: 'summary of quickstart',
  websiteUrl: null,
  keywords: [],
  authors: ['Joe Gregory (New Relic)'],
  relatedResources: [],
  dashboards: [
    {
      name: 'Battlesnake Performance',
      description:
        'Monitor your Battlensakes performance and see how it stacks up against your competition!',
      screenshots: [
        'https://raw.githubusercontent.com/newrelic/newrelic-quickstarts/main/quickstarts/battlesnake/dashboards/battlesnake-performance/battlesnake-performance.png',
      ],
    },
  ],
  alerts: [],
  documentation: [],
  installPlans: [
    {
      name: 'Custom Attributes',
      id: 'battlesnake',
    },
  ],
};

const PreviewPage = ({ location }) => {
  const urlParams = new URLSearchParams(location.search);
  let contentFiles;

  if (urlParams.get('local')) {
    //    contentFiles = useLocalhostQuickstart(location);
  } else {
    //contentFiles = usePullRequestQuickstart(location);
  }

  console.log('Parsed quickstart content:', contentFiles);

  const data = { quickstarts: testQuickstart };

  return <QuickstartDetails data={data} location={location} />;
};

PreviewPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PreviewPage;
