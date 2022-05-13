import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

import PropTypes from 'prop-types';

const GITHUB_API_BASE_URL =
  'https://api.github.com/repos/newrelic/newrelic-quickstarts/contents';

const GITHUB_API_PULL_URL =
  'https://api.github.com/repos/newrelic/newrelic-quickstarts/pulls';

/**
 * Recursive function to walk the file system in Github
 * @param {String} url - Github API URL to walk the file system
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

const getFileType = (fileName) => {
  // Regex for different filetypes
  const imageFileTypes = /^.*\.(jpg|jpeg|svg|png)$/i;
  const yamlFileTypes = /^.*\.(yaml|yml)$/i;
  const jsonFileType = /^.*\.(json)$/i;

  if (fileName.match(imageFileTypes)) {
    return 'image';
  } else if (fileName.match(yamlFileTypes)) {
    return 'yaml';
  } else if (fileName.match(jsonFileType)) {
    return 'json';
  }
};

const determineContent = async ({ download_url, name: fileName }) => {
  const rawFileResponse = await fetch(download_url);
  const fileType = getFileType(fileName);
  const content =
    fileType === 'image'
      ? await rawFileResponse.blob()
      : await rawFileResponse.text();

  const rawContentObj = {
    type: fileType,
    fileName,
    content,
  };
  return rawContentObj;
};

/**
 * Async function grabs the raw content from files
 * @param {Array} fileAggregator - array of Github metadata objects
 * @returns {Array<Object>} - array of objects containg raw content to parse
 *
 **/
const getRawContent = async (fileAggregator) => {
  const rawContent = Promise.all(
    fileAggregator.map(async (rawMetadata) => {
      return determineContent(rawMetadata);
    })
  );

  return rawContent;
};

/**
 * Async function handles fetching changed files in pull request from Github
 **/
const getQuickstartFilesFromPR = async (prNumber, quickstartPath) => {
  // Hit the Github API for SHA that references the PR branch
  const prResponse = await fetch(`${GITHUB_API_PULL_URL}/${prNumber}`);

  if (prResponse.status !== 200 || !prResponse.ok) {
    throw `Response from github came back with status: ${prResponse.status}`;
  }

  const prResponseJSON = await prResponse.json();
  const branchSHA = prResponseJSON.head.sha;

  // Recursively walk the Github API from the root of the quickstart
  const fileAggregator = await iterateDirs(
    `${GITHUB_API_BASE_URL}/quickstarts/${quickstartPath}?ref=${branchSHA}`
  );

  const rawContent = await getRawContent(fileAggregator);
  console.log(rawContent);
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

    try {
      getQuickstartFilesFromPR(prNumber, quickstartPath);
    } catch (error) {
      navigate('/');
      return;
    }
  }, []);

  return <span>oh hai</span>;
};

PreviewPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PreviewPage;
