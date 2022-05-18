'use strict';
const parseHelpers = require('../preview/parseHelpers');
const {
  expectedConfigOutput,
  configContent,
  baseFiles,
  dashboardFiles,
  dashboardContent,
  expectedDashboardOutput,
} = require('./testContent');

describe('Action: Parse helpers', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('parseQuickstartFiles for valid quickstart', () => {
    const output = parseHelpers.parseQuickstartFiles(baseFiles(configContent));
    expect(output).toEqual(expectedConfigOutput);
  });

  test('parseDashboardFiles for valid quickstart', () =>{
    const output = parseHelpers.parseDashboardFiles(dashboardFiles(dashboardContent));
    expect(output).toEqual(expectedDashboardOutput);
  })
});
