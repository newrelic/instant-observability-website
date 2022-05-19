const parseHelpers = require('../preview/parseHelpers');
const {
  expectedConfigOutput,
  configContent,
  baseFiles,
  dashboardFiles,
  dashboardContent,
  expectedDashboardOutput,
} = require('../mock_data/content');

console.log(baseFiles);

describe('Action: Parse helpers', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('parseQuickstartFiles for valid quickstart', () => {
    const input = baseFiles(configContent);
    const output = parseHelpers.parseQuickstartFiles(input);

    expect(output).toEqual(expectedConfigOutput);
  });

  test('parseDashboardFiles for valid quickstart', () =>{
    const input = dashboardFiles(dashboardContent)
    const output = parseHelpers.parseDashboardFiles(input);

    expect(output).toEqual(expectedDashboardOutput);
  })
});
