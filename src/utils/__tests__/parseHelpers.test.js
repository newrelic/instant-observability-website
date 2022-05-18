'use strict';
const parseHelpers = require('../preview/parseHelpers');
const {
  expectedConfigOutput,
  baseFiles,
  dashboardFiles,
  expectedDashboardOutput,
} = require('./testContent');

describe('Action: Parse helpers', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('parseQuickstartFiles for valid quickstart', () => {
    const output = parseHelpers.parseQuickstartFiles(baseFiles);
    expect(output).toEqual(expectedConfigOutput);
  });

  test('parseDashboardFiles for valid quickstart', () =>{
    const output = parseHelpers.parseDashboardFiles(dashboardFiles);
    console.log(output);
  })
});
