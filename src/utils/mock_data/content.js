export const installPlansContent = `
installPlans:
  - guided-install
`;

export const configContent = `
id: generic-quickstart-id-1
slug: quickstart-slug
description: example description 
summary: example summary 
icon: logo.png
level: NEW_RELIC
authors:
  - New Relic
title: Generic Quickstart
keywords:
  - os
  - operating system

${installPlansContent}
`;

export const configContentMissingFields = `
id: generic-quickstart-id-1
slug: quickstart-slug
description: example description 
icon: logo.png
level: NEW_RELIC 
authors:
  - New Relic
keywords:
  - os
  - operating system

${installPlansContent}
`;

export const dashboardContent = {
  name: 'mock dashboard name',
  description: 'mock dashboard description',
};

export const missingConfigOutput = {
  title: 'Generic Quickstart',
  summary: 'example summary',
};

export const installPlansInput = ['guided-install'];

export const documentationInput = [
  {
    name: 'Kamon installation docs',
    description:
      'Kamon is used to automatically instrument, monitor and debug distributed\nsystems.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
    url:
      'https://docs.newrelic.com/docs/integrations/open-source-telemetry-integrations/open-source-telemetry-integration-list/kamon-reporter',
  },
];

export const documentationOutput = [
  {
    name: 'Kamon installation docs',
    description:
      'Kamon is used to automatically instrument, monitor and debug distributed\nsystems.',
    url:
      'https://docs.newrelic.com/docs/integrations/open-source-telemetry-integrations/open-source-telemetry-integration-list/kamon-reporter',
  },
];

export const installPlansOutput = [
  {
    name: '',
    id: 'guided-install',
  },
];

export const expectedConfigOutput = {
  title: 'Generic Quickstart',
  name: 'quickstart-slug',
  description: 'example description',
  packUrl:
    'https://github.com/newrelic/newrelic-quickstarts/tree/main/quickstarts/mock_quickstart_1',

  id: 'generic-quickstart-id-1',
  level: 'NEW_RELIC',
  logoUrl: 'fake/path/to/logo.png',
  summary: 'example summary',
  keywords: ['os', 'operating system'],
  authors: ['New Relic'],
  relatedResources: [],
  documentation: [],
  installPlans: installPlansOutput,
};

export const baseFiles = (content) => [
  {
    type: 'yaml',
    filePath: 'mock_quickstart_1/config.yml',
    fileName: 'config.yml',
    content: content,
  },
  {
    type: 'image',
    filepath: 'mock_quickstarts_1/logo.png',
    fileName: 'logo.png',
    content: 'fake/path/to/logo.png',
  },
];

export const dashboardFiles = (content) => [
  {
    type: 'json',
    filePath:
      'mock_quickstart_1/dashboards/custom_dashboard/mock_dashboard.json',
    fileName: 'mock_dashboard.json',
    content: JSON.stringify(content),
  },
  {
    type: 'image',
    filePath:
      'mock_quickstart_1/dashboards/custom_dashboard/mock_dashboard01.png',
    fileName: 'mock_dashboard01.png',
    content: 'mock/url/for/mock_dashboard01.png',
  },
  {
    type: 'image',
    filePath:
      'mock_quickstart_1/dashboards/custom_dashboard/mock_dashboard02.png',
    fileName: 'mock_dashboard02.png',
    content: 'mock/url/for/mock_dashboard02.png',
  },
];

export const expectedDashboardOutput = [
  {
    name: 'mock dashboard name',
    description: 'mock dashboard description',
    screenshots: {
      publicURL: [
        'mock/url/for/mock_dashboard01.png',
        'mock/url/for/mock_dashboard02.png',
      ],
    },
  },
];
