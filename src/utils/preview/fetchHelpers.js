import { GITHUB_API_BASE_URL, GITHUB_API_PULL_URL } from '../../data/constants';

/**
 * Recursive function to walk the file system in Github
 * @param {String} url - Github API URL to walk the file system
 * @returns {Array} array of files
 **/
export const iterateDirs = async (url) => {
  const response = await fetch(url);
  if (response.status !== 200 || !response.ok) {
    throw new Error(
      `Response came back while walking the file tree with status ${response.status}\nFetched URL: ${url}`
    );
  }
  const json = await response.json();
  let fileAggregator = [];

  for (const dirListing of json) {
    if (dirListing.type === 'dir') {
      const dirFiles = await iterateDirs(dirListing.url);
      fileAggregator = [...fileAggregator, ...dirFiles];
    } else {
      fileAggregator = [...fileAggregator, dirListing];
    }
  }
  return fileAggregator;
};

/**
 * Function handles retreiving the type of file for parsing
 * @param {String} fileName - file name to check
 * @returns {String} - type of file
 **/
export const getFileType = (fileName) => {
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

/**
 * Function determines the type of content depending on type of image
 * @param {Object} - Metadata object to parse
 * @param {Object}.download_url - raw file URL
 * @param {Object}.name - name of the file
 * @returns {Object} - Object of file containing type, fileName, and content of
 * file
 **/
export const determineContent = async ({
  download_url,
  name: fileName,
  path,
}) => {
  const type = getFileType(fileName);
  let rawFileResponse = null;

  if (type !== 'image') {
    rawFileResponse = await fetch(download_url);
  }

  // if the file is an image, we can supply the URL to the raw content
  const content =
    type === 'image' ? download_url : await rawFileResponse.text();

  const filePath = path.split('quickstarts/').pop();

  return {
    type,
    filePath,
    fileName,
    content,
  };
};

/**
 * Function grabs the raw content from files
 * @param {Array} fileAggregator - array of Github metadata objects
 * @returns {Promise<Array<Object>>} - array of objects containg raw content to parse
 *
 **/
export const getRawContent = (fileAggregator) => {
  return Promise.all(fileAggregator.map(determineContent));
};

/**
 * Async function handles fetching changed files in pull request from Github
 **/
export const getQuickstartFilesFromPR = async (prNumber, quickstartPath) => {
  // Hit the Github API for SHA that references the PR branch
  const response = await fetch(`${GITHUB_API_PULL_URL}/${prNumber}`);

  if (response.status !== 200 || !response.ok) {
    throw new Error(
      `Response from pull request came back with status ${response.status}\n`
    );
  }

  // Response containing files at root of PR
  const json = await response.json();
  const branchSHA = json.head.sha;

  // Recursively walk the Github API from the root of the quickstart
  const fileAggregator = await iterateDirs(
    `${GITHUB_API_BASE_URL}/quickstarts/${quickstartPath}?ref=${branchSHA}`
  );
  return getRawContent(fileAggregator);
};
