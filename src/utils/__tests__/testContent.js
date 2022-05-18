export const configContent = `
    id: generic-quickstart-id-1
    slug: quickstart-slug
    description: example description 
    summary: example summary 
    icon: logo.png
    level: New Relic 
    authors:
      - New Relic
    title: Generic Quickstart
    keywords:
      - os
      - operating system
    
    installPlans:
      - guided-install
    `;

export const dashboardContent = {
  name: 'mock dashboard name',
  description: 'mock dashboard description',
};

export const expectedConfigOutput = {
  title: 'Generic Quickstart',
  name: 'quickstart-slug',
  description: 'example description',
  packUrl:
    'https://github.com/newrelic/newrelic-quickstarts/tree/main/quickstarts/mock_quickstart_1',

  id: 'generic-quickstart-id-1',
  level: 'New Relic',
  logoUrl: 'fake/path/to/logo.png',
  summary: 'example summary',
  keywords: ['os', 'operating system'],
  authors: ['New Relic'],
  relatedResources: [],
  documentation: [],
  installPlans: [
    {
      name: '',
      id: 'guided-install',
    },
  ],
};

export const baseFiles = [
  {
    type: 'yaml',
    filePath: 'mock_quickstart_1/config.yml',
    fileName: 'config.yml',
    content: configContent,
  },
  {
    type: 'image',
    filepath: 'mock_quickstarts_1/logo.png',
    fileName: 'logo.png',
    content: 'fake/path/to/logo.png',
  },
];

export const dashboardFiles = [
  {
    type: 'json',
    filePath:
      'mock_quickstart_1/dashboards/custom_dashboard/mock_dashboard.json',
    fileName: 'mock_dashboard.json',
    content: JSON.stringify(dashboardContent),
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
    screenshots: ['mock/url/for/mock_dashboard01.png', 'mock/url/for/mock_dashboard02.png'],
  },
];
