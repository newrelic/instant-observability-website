'use strict';
const parseHelpers = require('../preview/parseHelpers');

describe('Action: Parse helpers', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('parseQuickstartFiles for valid quickstart', () => {
    const expectedConfigOutput = {
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

    const configContent = `
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

    const files = [
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
        content: 'fake/path/to/logo.png'
      },
    ];

    const output = parseHelpers.parseQuickstartFiles(files);
    expect(output).toEqual(expectedConfigOutput);
  });
});
