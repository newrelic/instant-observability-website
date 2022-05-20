const yaml = require('js-yaml');

/**
 * @typedef {import('./fetchHelpers').FileMetadata} FileMetadata
 */

const parseDocs = (docs) => {
  const parsedDocs = docs.map((doc) => {
    doc.description = doc.description?.trim();
    return doc;
  });

  return parsedDocs;
};

const parseInstallPlans = (installPlans) => {
  const parsedInstallPlans = installPlans.map((planId) => {
    const installPlan = {
      id: planId,
      name: '',
    };
    return installPlan;
  });
  return parsedInstallPlans;
};

const parseQuickstartFiles = (quickstartFiles) => {
  let quickstartContent = {};
  let config;

  quickstartFiles.forEach((file) => {
    if (file.type === 'yaml' && file.fileName.includes('config')) {
      config = file;
    }
  });

  //build the packUrl since it is not part of the raw github file contents
  //assumes the filePath is always directly under 'quickstarts/'
  const packUrl =
    'https://github.com/newrelic/newrelic-quickstarts/tree/main/quickstarts/' +
    config.filePath.split('/config')[0];

  let loadYaml = yaml.load(config.content);

  //iterate through the array of documentation objects to trim new lines

  quickstartFiles.forEach((file) => {
    if (file.type === 'image' && file.fileName === loadYaml.icon) {
      quickstartContent.logoUrl = file.content;
    }
  });

  const parsedQuickstartDocs =
    loadYaml.documentation?.length > 0 ? parseDocs(loadYaml.documentation) : [];
  const parsedInstallPlans =
    loadYaml.installPlans?.length > 0
      ? parseInstallPlans(loadYaml.installPlans)
      : [];

  quickstartContent.authors = loadYaml.authors ?? [];
  quickstartContent.description = loadYaml.description?.trim() ?? '';
  quickstartContent.documentation = parsedQuickstartDocs;
  quickstartContent.id = loadYaml.id ?? '';
  quickstartContent.installPlans = parsedInstallPlans;
  quickstartContent.keywords = loadYaml.keywords ?? [];
  quickstartContent.level = loadYaml.level ?? '';
  quickstartContent.name = loadYaml.slug ?? '';
  quickstartContent.packUrl = packUrl ?? '';
  quickstartContent.relatedResources = []; //we don't get these from the config.yml
  quickstartContent.summary = loadYaml.summary?.trim() ?? '';
  quickstartContent.title = loadYaml.title ?? '';

  return quickstartContent;
};

/**
 * Parses dashboard configuration files and screenshots
 * @param {FileMetadata[]}
 * @returns {Object[]} An array of quickstart dashboard objects, Ex: { name: '', description: '', screenshots: [''] }
 */
const parseDashboardFiles = (files) => {
  const configs = files.filter((d) => d.filePath.includes('.json'));
  const screenshots = files.filter((d) => !d.filePath.includes('.json'));
  return configs.map((dashFileMetadata) => {
    const parentDir = dashFileMetadata.filePath.split(
      dashFileMetadata.fileName
    )[0];

    const { name = '', description = '' } = JSON.parse(
      dashFileMetadata.content
    );

    return {
      name,
      description,
      screenshots: screenshots
        .filter((s) => s.filePath.includes(parentDir))
        .map(({ content }) => content),
    };
  });
};

/**
 * Parses the details, name, and type fields out of an alert config
 * @param {FileContent[]} alertFiles - alert config files
 * @returns {Object[]} Ex: { details: '', name: '', type: '' }
 */
const parseAlertFiles = (alertFiles) => {
  return alertFiles.map((file) => {
    const loadYaml = yaml.load(file.content);

    //parse and build alert object and add it to the array
    return {
      details: loadYaml.description?.trim() ?? '',
      name: loadYaml.name?.trim() ?? '',
      type: loadYaml.type?.trim() ?? '',
    };
  });
};

/**
 * Parses quickstart files to build an object similar to the quickstart definition in `src/data/quickstarts.json`
 * @param {FileMetadata[]} rawFiles - An array of FileContents for a particular quickstart
 * @returns {Object} A quickstart object ready for display within the `QuickstartDetails` component.
 */
const parseFiles = (rawFiles) => {
  let dashboardFiles = [];
  let alertFiles = [];
  let quickstartDirs = {};
  let quickstartFiles = [];

  for (const file of rawFiles) {
    if (file.filePath.includes('/dashboards/')) {
      dashboardFiles.push(file);
    } else if (file.filePath.includes('/alerts/')) {
      alertFiles.push(file);
    } else {
      quickstartFiles.push(file);
    }
  }

  const dashboardsDirs =
    dashboardFiles.length > 0 ? parseDashboardFiles(dashboardFiles) : [];
  const alertsDir = alertFiles.length > 0 ? parseAlertFiles(alertFiles) : [];
  quickstartDirs.dashboards = dashboardsDirs;
  quickstartDirs.alerts = alertsDir;
  const quickstart = parseQuickstartFiles(quickstartFiles);

  //merge together the parsed quickstart content and the alerts/dashboard arrrays
  return { ...quickstartDirs, ...quickstart };
};

/**
 * Async function handles parsing fetched files from pull request
 * Transforms them into shape needed for QuickstartDetails.js
 **/
const parseQuickstartFilesFromPR = (rawFileContent) => {
  return parseFiles(rawFileContent);
};

module.exports = {
  parseDocs,
  parseInstallPlans,
  parseQuickstartFiles,
  parseDashboardFiles,
  parseAlertFiles,
  parseQuickstartFilesFromPR,
};
