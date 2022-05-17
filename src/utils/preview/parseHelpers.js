import yaml from 'js-yaml';

const parseQuickstartFiles = (quickstartFiles) => {
  let quickstartContent = {};
  quickstartFiles.forEach((file) => {
    if (file.fileName.includes('logo') && file.type === 'image') {
      quickstartContent.logoUrl = file.content;
    }
    if (file.type === 'yaml') {
      //if config, parse the yaml
      const loadYaml = yaml.load(file.content);
      let docs = loadYaml.documentation;

      //itterate through the array of documentation objects to trim new lines
      if (docs && docs.length > 0) {
        docs = docs.map((doc) => {
          doc.description = doc.description?.trim();
          return doc;
        });
      }
      //build the packUrl since it is not part of the raw github file contents
      //assumes the pathName is always directly under 'quickstarts/'
      const packUrl =
        'https://github.com/newrelic/newrelic-quickstarts/tree/main/quickstarts/' +
        file.filePath.split('/config')[0];

      quickstartContent.authors = loadYaml.authors ?? [];
      quickstartContent.description = loadYaml.description?.trim() ?? '';
      quickstartContent.documentation = docs ?? [];
      quickstartContent.id = loadYaml.id ?? '';
      quickstartContent.installPlans = loadYaml.installPlans ?? [];
      quickstartContent.keywords = loadYaml.keywords ?? [];
      quickstartContent.level = loadYaml.level ?? '';
      quickstartContent.name = loadYaml.slug ?? '';
      quickstartContent.packUrl = packUrl ?? '';
      quickstartContent.relatedResources = [];
      quickstartContent.summary = loadYaml.summary?.trim() ?? '';
      quickstartContent.title = loadYaml.title ?? '';
    }
  });
  return quickstartContent;
};

const parseDashboardFiles = (dashboardFiles) => {
  const dashboards = [];
  //split each filepath to get its dashboard dir
  dashboardFiles.forEach((file) => {
    const getDir = file.filePath.split('/dashboards/')[1].split('/')[0];
    //add it to the dashboard dirs object as a key if new
    //or update it if not
    if (!dashboards[getDir]) {
      dashboards[getDir] = { name: '', description: '', screenshots: [] };
    }
    if (file.type === 'json') {
      const dashboardContent = JSON.parse(file.content);
      dashboards[getDir]['name'] = dashboardContent.name ?? '';
      dashboards[getDir]['description'] = dashboardContent.description ?? '';
    }
    if (file.type === 'image') {
      dashboards[getDir]['screenshots'].push(file.content);
    }
  });
  return Object.values(dashboards);
};

const parseAlertFiles = (alertFiles) => {
  //add each alert to the array, parsing out its relevent data into an object
  let alerts = [];
  alertFiles.forEach((file) => {
    const loadYaml = yaml.load(file.content);

    const alert = {
      details: loadYaml.description?.trim() ?? '',
      name: loadYaml.name?.trim() ?? '',
      type: loadYaml.type?.trim() ?? '',
    };

    alerts.push(alert);
  });
  return alerts;
};

const parseFiles = (rawFile) => {
  let dashboardFiles = [];
  let alertFiles = [];
  let quickstartFiles = [];
  let quickstartDirs = {};

  for (const file of rawFile) {
    if (file.filePath.includes('/dashboards/')) {
      //add too array
      dashboardFiles.push(file);
    } else if (file.filePath.includes('/alerts/')) {
      //add to array
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
  const parsedQuickstart = { ...quickstartDirs, ...quickstart };

  return parsedQuickstart;
};

/**
 * Async function handles parsing fetched files from pull request
 * Transforms them into shape needed for QuickstartDetails.js
 **/

export const parseQuickstartFilesFromPR = (rawFileContent) => {
  return parseFiles(rawFileContent);
};
