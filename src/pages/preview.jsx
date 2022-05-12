import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

import PropTypes from 'prop-types';

const GITHUB_API_BASE_URL =
  'https://api.github.com/repos/newrelic/newrelic-quickstarts/contents';

const GITHUB_API_PULL_URL =
  'https://api.github.com/repos/newrelic/newrelic-quickstarts/pulls';

/**
 * Recursive function to walk the file system in GitHub
 * @param {String} url - GitHub API URL to walk the file system
 * @returns {Array} array of files
 **/
const iterateDirs = async (url) => {
  const branchResponse = await fetch(url);
  const branchResponseJSON = await branchResponse.json();
  let fileAggregator = [];

  for (const dirListing of branchResponseJSON) {
    if (dirListing.type === 'dir') {
      const dirFiles = await iterateDirs(dirListing.url);
      fileAggregator = [...fileAggregator, ...dirFiles];
    } else {
      fileAggregator = [...fileAggregator, dirListing];
    }
  }
  return fileAggregator;
};

const getQuickstartFilesFromPR = async (prNumber, quickstartPath) => {
  // Hit the Github API for SHA that references the PR branch
  const prResponse = await fetch(`${GITHUB_API_PULL_URL}/${prNumber}`);

  if (prResponse.status !== 200 || !prResponse.ok) {
    await navigate('/');
    return;
  }

  const prResponseJSON = await prResponse.json();
  const branchSHA = prResponseJSON.head.sha;

  // Recursively walk the Github API from the root of the quickstart
  const fileAggregator = await iterateDirs(
    `${GITHUB_API_BASE_URL}/quickstarts/${quickstartPath}?ref=${branchSHA}`
  );
  console.log(fileAggregator);
};

const PreviewPage = ({ location }) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const prNumber = urlParams.get('pr');
    const quickstartPath = urlParams.get('quickstart');

    if (!prNumber || !quickstartPath) {
      navigate('/');
      return;
    }

    getQuickstartFilesFromPR(prNumber, quickstartPath);
  }, []);

  return <span>oh hai</span>;
};

PreviewPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PreviewPage;
