module.exports = {
  // https://github.com/newrelic/eslint-plugin-newrelic
  extends: [
    'plugin:@newrelic/eslint-plugin-newrelic/react',
    'plugin:@newrelic/eslint-plugin-newrelic/prettier',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
  ],
  // https://github.com/yannickcr/eslint-plugin-react#configuration
  plugins: ['react', 'jsx-a11y', 'markdown'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-empty-function': 2,
        '@typescript-eslint/explicit-module-boundary-types': 2,
        '@typescript-eslint/explicit-function-return-type': 2,
        '@typescript-eslint/no-unsafe-argument': 2,
        '@typescript-eslint/no-use-before-define': 2,
        '@typescript-eslint/no-explicit-any': 2,
        '@typescript-eslint/no-misused-promises': 0,
        '@typescript-eslint/no-inferrable-types': 0,
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
  },
  ignorePatterns: [
    '**/__tests__/**/*',
    '**/node_modules/**/*',
    '**/public/**/*',
    '**/static/*',
  ],
  rules: {
    'jsx-a11y/no-onchange': 0,
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: false,
      },
    ],
    // This prevents us from accidently importing from the theme's `index` file
    // and pulling in a bunch of extra dependecies.
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@newrelic/gatsby-theme-newrelic',
            message:
              'Please import the module directly from @newrelic/gatsby-theme-newrelic/src/[module] instead.',
          },
        ],
        patterns: ['!@newrelic/gatsby-theme-newrelic/*'],
      },
    ],
  },
};
