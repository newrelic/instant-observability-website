import * as parseHelpers from '../preview/parseHelpers';
const {
  expectedConfigOutput,
  missingConfigOutput,
  configContentMissingFields,
  configContent,
  installPlansInput,
  baseFiles,
  dashboardFiles,
  dashboardContent,
  expectedDashboardOutput,
  installPlansOutput,
  documentationInput,
  documentationOutput,
} = require('../mock_data/content');

console.log(baseFiles);

describe('parseHelpers', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('parseDocs for a documentation with multiuple newlines at the end', () => {
    const output = parseHelpers.parseDocs(documentationInput);
    expect(output).toEqual(documentationOutput);
  });

  test('parseDocs for empty documentation list', () => {
    expect(() => {
      parseHelpers.parseDocs([]);
    }).not.toThrowError();
  });

  test('parseDocs for a documentation without description field', () => {
    const input = [
      {
        name: 'Kamon installation docs',
        url:
          'https://docs.newrelic.com/docs/integrations/open-source-telemetry-integrations/open-source-telemetry-integration-list/kamon-reporter',
      },
    ];

    const output = parseHelpers.parseDocs(input);
    expect(output).toEqual(input);
  });

  test('parseInstallPlans for a single install plan', () => {
    const output = parseHelpers.parseInstallPlans(installPlansInput);
    expect(output).toEqual(installPlansOutput);
  });

  test('parseInstallPlans for multiple install plans', () => {
    const multipleInputs = ['install-plan', 'guided-install', 'battlesnake'];
    const output = parseHelpers.parseInstallPlans(multipleInputs);

    expect(output).toEqual([
      { name: '', id: 'install-plan' },
      { name: '', id: 'guided-install' },
      { name: '', id: 'battlesnake' },
    ]);
  });

  test('parseInstallPlans for no install plan', () => {
    const input = [];
    const output = parseHelpers.parseInstallPlans(input);

    expect(output).toEqual([]);
  });

  test('parseInstallPlans for no install plan not to throw', () => {
    const input = [];
    const output = parseHelpers.parseInstallPlans(input);

    expect(() => {
      parseHelpers.parseInstallPlans(input);
    }).not.toThrowError();
  });

  test('parseQuickstartFiles for valid quickstart', () => {
    const input = baseFiles(configContent);
    const output = parseHelpers.parseQuickstartFiles(input);

    expect(output).toEqual(expectedConfigOutput);
  });

  test('parseQuickstartFiles for invalid quickstart', () => {
    const input = baseFiles(configContentMissingFields);
    const output = parseHelpers.parseQuickstartFiles(input);

    expect({ ...output, ...missingConfigOutput }).toEqual(expectedConfigOutput);
  });

  test('parseQuickstartFiles for invalid quickstart not to throw', () => {
    const input = baseFiles(configContentMissingFields);
    expect(() => {
      parseHelpers.parseQuickstartFiles(input);
    }).not.toThrow();
  });

  test('parseDashboardFiles for valid quickstart', () => {
    const input = dashboardFiles(dashboardContent);
    const output = parseHelpers.parseDashboardFiles(input);

    expect(output).toEqual(expectedDashboardOutput);
  });
});
