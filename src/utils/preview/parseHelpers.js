import yaml from 'js-yaml';

export const parseDocs = (docs) => {
  const parsedDocs = docs.map((doc) => {
    doc.description = doc.description?.trim();
    return doc;
  });

  return parsedDocs;
};

export const parseInstallPlans = (installPlans) => {
  const parsedInstallPlans = installPlans.map((planId) => {
    const installPlan = {
      id: planId,
      name: '',
    };
    return installPlan;
  });
  return parsedInstallPlans;
};

export const parseQuickstartFiles = (quickstartFiles) => {
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

export const parseDashboardFiles = (dashboardFiles) => {
  const dashboards = {};
  //split each filepath to get its dashboard dir
  dashboardFiles.forEach((file) => {
    const getDir = file.filePath.split('/dashboards/')[1].split('/')[0];
    //add it to the dashboard dirs object as a key if new
    //or update it if not
    if (!dashboards[getDir]) {
      dashboards[getDir] = { name: '', description: '', screenshots: [] };
    }
    //parse and construct the dashboard object and push it to the array
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

export const parseAlertFiles = (alertFiles) => {
  let alerts = [];
  alertFiles.forEach((file) => {
    const loadYaml = yaml.load(file.content);

    //parse and build alert object and add it to the array
    const alert = {
      details: loadYaml.description?.trim() ?? '',
      name: loadYaml.name?.trim() ?? '',
      type: loadYaml.type?.trim() ?? '',
    };
    alerts.push(alert);
  });

  return alerts;
};

export const parseFiles = (rawFile) => {
  let dashboardFiles = [];
  let alertFiles = [];
  let quickstartDirs = {};
  let quickstartFiles = [];

  for (const file of rawFile) {
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
