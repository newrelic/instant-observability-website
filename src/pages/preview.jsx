import React, { useEffect } from 'react';

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
const iterateDirs = async (files, url) => {
  const branchResponse = await fetch(url);
  const branchResponseJSON = await branchResponse.json();

  for (const dirListing of branchResponseJSON) {
    if (dirListing.type === 'file') {
      files.push(dirListing);
    } else {
      await iterateDirs(files, dirListing.url);
    }
  }
};

const fetchData = async (prNumber, quickstartPath) => {
  // Hit the Github API for SHA that references the PR branch
  const prResponse = await fetch(`${GITHUB_API_PULL_URL}/${prNumber}`);
  const prResponseJSON = await prResponse.json();
  const branchSHA = prResponseJSON.head.sha;

  // Recursively walk the Github API from the root of the quickstart
  const files = [];
  await iterateDirs(
    files,
    `${GITHUB_API_BASE_URL}/quickstarts/${quickstartPath}?ref=${branchSHA}`
  );
  console.log(files);
};

const PreviewPage = ({ location }) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const prNumber = urlParams.get('pr');
    const quickstartPath = urlParams.get('quickstart');

    fetchData(prNumber, quickstartPath);
  }, []);

  return <span>oh hai</span>;
};

PreviewPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PreviewPage;
