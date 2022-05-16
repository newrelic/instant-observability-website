import { GITHUB_API_BASE_URL, GITHUB_API_PULL_URL } from '../../data/constants';

/**
 * Recursive function to walk the file system in Github
 * @param {String} url - Github API URL to walk the file system
 * @returns {Array} array of files
 **/
export const iterateDirs = async (url) => {
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
export const determineContent = async ({ download_url, name: fileName, path }) => {
  const type = getFileType(fileName);
  let rawFileResponse = null;

  if (type !== 'image') {
    rawFileResponse = await fetch(download_url);
  }

  // if the file is an image, we can supply the URL to the raw content
  const content =
    type === 'image' ? download_url : await rawFileResponse.text();

  const filePath = path.split('quickstarts/').pop();

  const rawContentObj = {
    type,
    filePath,
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
export const getRawContent = async (fileAggregator) => {
  const rawContent = Promise.all(
    fileAggregator.map(async (rawMetadata) => {
      return determineContent(rawMetadata);
    })
  );

  return rawContent;
};

/**
 * Async function to get list of files from localhost
 * @param {number} port - Optional port env variable from the quickstart preview server. Defaults to 3000 
 * @returns {Array<string>} - List of file names to be used to fetch the files from the local server
 */

export const getFileListFromLocal = async (port) => {
  const response = await fetch(`http://localhost:${port}`);

  if (response.status !== 200 || !response.ok) return null;

  const fileList = response.json();

  return fileList;
};

export const getQuickstartFilesFromLocal = async (fileList, port) => {
  const data = fileList.map(path => {
    return {
      path,
      name: path.split('/').pop(),
      download_url: `http://localhost:${port}/${path}`
    }
  });

  const content = await getRawContent(data);

  return content;
};

/**
 * Async function handles fetching changed files in pull request from Github
 **/
export const getQuickstartFilesFromPR = async (prNumber, quickstartPath) => {
  // Hit the Github API for SHA that references the PR branch
  const prResponse = await fetch(`${GITHUB_API_PULL_URL}/${prNumber}`);

  if (prResponse.status !== 200 || !prResponse.ok) {
    return null;
  }

  // Response containing files at root of PR
  const prResponseJSON = await prResponse.json();
  const branchSHA = prResponseJSON.head.sha;

  // Recursively walk the Github API from the root of the quickstart
  const fileAggregator = await iterateDirs(
    `${GITHUB_API_BASE_URL}/quickstarts/${quickstartPath}?ref=${branchSHA}`
  );

  const fileContent = await getRawContent(fileAggregator);
  return fileContent;
};

