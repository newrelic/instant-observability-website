import yaml from 'js-yaml';

let dashboardDirs = {};
let alertsDir = [];

let parsedQuickstart = {
  alerts: alertsDir ?? [],
  dashboards: dashboardDirs ?? [],
};

const parseQuickstartDir = (file) => {
  if (file.fileName.includes('logo') && file.type === 'image') {
    parsedQuickstart.logoUrl = file.content;
  }
  if (file.type === 'yaml') {
    //if config, parse the yaml
    const loadYaml = yaml.load(file.content);

    //itterate through the array of documentation objects to trim new lines
    const trimmedDocumentation = loadYaml.documentation.map((doc) => {
      doc.description = doc.description?.trim();
      return doc;
    });
    //build the packUrl since it is not part of the raw github file contents
    const packUrl =
      'https://github.com/newrelic/newrelic-quickstarts/tree/main/quickstarts/' +
      file.filePath.split('/config')[0];
    //assumes the pathName is always directly under 'quickstarts/'

    parsedQuickstart.authors = loadYaml.authors ?? [];
    parsedQuickstart.description = loadYaml.description?.trim() ?? '';
    parsedQuickstart.documentation = trimmedDocumentation ?? [];
    parsedQuickstart.id = loadYaml.id ?? '';
    parsedQuickstart.installPlans = loadYaml.installPlans ?? [];
    parsedQuickstart.keywords = loadYaml.keywords ?? [];
    parsedQuickstart.level = loadYaml.level ?? '';
    parsedQuickstart.name = loadYaml.slug ?? '';
    parsedQuickstart.packUrl = packUrl ?? '';
    parsedQuickstart.relatedResources = [];
    parsedQuickstart.summary = loadYaml.summary?.trim() ?? '';
    parsedQuickstart.title = loadYaml.title ?? '';
  }
};

const parseDashboardDir = (file) => {
  //split each filepath to get its dashboard dir
  const getDir = file.filePath.split('/dashboards/')[1].split('/')[0];
  //add it to the dashboard dirs object as a key if new
  //or update it if not
  if (!dashboardDirs[getDir]) {
    dashboardDirs[getDir] = { name: '', description: '', screenshots: [] };
  }
  if (file.type === 'json') {
    const dashboardContent = JSON.parse(file.content);
    dashboardDirs[getDir]['name'] = dashboardContent.name ?? '';
    dashboardDirs[getDir]['description'] = dashboardContent.description ?? '';
  }
  if (file.type === 'image') {
    dashboardDirs[getDir]['screenshots'].push(file.content);
  }
};

const parseAlertsDir = (file) => {
  //add each alert to the array, parsing out its relevent data into an object
  const loadYaml = yaml.load(file.content);

  const alert = {
    details: loadYaml.description?.trim() ?? '',
    name: loadYaml.name?.trim() ?? '',
    type: loadYaml.type?.trim() ?? '',
  };

  alertsDir.push(alert);
};

const checkFileType = (rawFile) => {
  for (const each in rawFile) {
    const file = rawFile[each];
    if (file.filePath.includes('/dashboards/')) {
      parseDashboardDir(file);
    } else if (file.filePath.includes('/alerts/')) {
      parseAlertsDir(file);
    } else {
      parseQuickstartDir(file);
    }
  }
};

/**
 * Async function handles parsing fetched files from pull request
 * Transforms them into shape needed for QuickstartDetails.js
 **/

export const parseQuickstartFilesFromPR = async (rawFileContent) => {
  checkFileType(rawFileContent);
  dashboardDirs = Object.values(dashboardDirs);

  return parsedQuickstart;
};
