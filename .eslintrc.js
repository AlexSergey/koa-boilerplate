const defaultEnv = 'production';
const supportedEnvs = ['development', 'production'];
const currentEnv = supportedEnvs.includes(process.env.NODE_ENV) ? process.env.NODE_ENV : defaultEnv;
const isDevelopment = currentEnv === 'development';

const ignoredPropNames = `^(${['DefaultContext'].join('|')})$`;

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  plugins: ['import', 'unicorn', '@typescript-eslint', 'sort-keys-fix'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['jest.config.ts', 'jest.e2e.config.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['**/**/*.json'],
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
        'prettier/prettier': 'off',
      },
    },
  ],
  rules: {
    'no-await-in-loop': 'off',
    'newline-before-return': 'error',
    camelcase: ['error', { properties: 'always' }],
    'no-param-reassign': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': isDevelopment
      ? 'off'
      : [
          'error',
          {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: false,
          },
        ],
    'no-alert': isDevelopment ? 'off' : 'error',
    'no-console': isDevelopment ? 'off' : 'error',
    'no-debugger': isDevelopment ? 'off' : 'error',

    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        useTabs: false,
        semi: true,
        trailingComma: 'all',
        bracketSpacing: true,
        printWidth: 120,
        endOfLine: 'lf',
      },
    ],

    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        prefix: ['I'],
        format: ['UPPER_CASE', 'StrictPascalCase'],
        filter: {
          regex: ignoredPropNames,
          match: false,
        },
      },
    ],
    '@typescript-eslint/ban-ts-comment': isDevelopment ? 'off' : 'error',

    'sort-keys-fix/sort-keys-fix': 'warn',

    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        pathGroups: [
          {
            pattern: '@',
            group: 'internal',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',

    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
      },
    ],
    'unicorn/throw-new-error': 'error',
    'unicorn/no-instanceof-array': 'error',
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/prefer-keyboard-event-key': 'error',
    'unicorn/error-message': 'error',
    'unicorn/empty-brace-spaces': 'error',
    'unicorn/custom-error-definition': 'error',
  },
};
