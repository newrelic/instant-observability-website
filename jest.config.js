module.exports = {
  transform: {
    '^.+\\.js$': '<rootDir>/jest-preprocess.js',
    '.(ts|tsx)': 'ts-jest',
  },
  testPathIgnorePatterns: ['node_modules', '\\.cache/'],
  globals: {
    __PATH_PREFIX__: '',
  },
  testMatch: ['<rootDir>/**/__tests__/?(*.)+(test).[jt]s?(x)'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby||gatsby-plugin-mdx)/)'],
  setupFiles: [
    '<rootDir>/src/utils/__tests__/loadershim.js',
    '<rootDir>/scripts/actions/__tests__/loadershim.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/setup-test-env.js'],
  moduleNameMapper: {
    '^@reach/router(.*)': '<rootDir>/node_modules/@gatsbyjs/reach-router$1',
    '^gatsby-page-utils/(.*)$': `gatsby-page-utils/dist/$1`,
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@hooks(.*)$': '<rootDir>/src/hooks$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@layouts(.*)$': '<rootDir>/src/layouts$1',
    '^@data(.*)$': '<rootDir>/src/data$1',
  },
};
