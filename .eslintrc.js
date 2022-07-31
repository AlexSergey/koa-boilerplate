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
  ignorePatterns: ['.eslintrc.js', '.eslintrc.cjs'],
  plugins: ['import', 'unicorn', '@typescript-eslint', 'sort-keys-fix', 'check-file'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
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
  rules: {
    'no-unused-vars': 'off',
    'no-plusplus': 'off',
    'no-return-await': 'off',
    camelcase: ['error', { properties: 'always' }],
    'class-methods-use-this': 'off',
    'no-await-in-loop': 'off',
    'no-alert': isDevelopment ? 'off' : 'error',
    'no-console': isDevelopment ? 'off' : 'error',
    'no-debugger': isDevelopment ? 'off' : 'error',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'newline-before-return': 'error',

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
    '@typescript-eslint/no-unused-vars': isDevelopment
      ? 'off'
      : [
          'error',
          {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: false,
          },
        ],
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

    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.js', '**/*.spec.js'],
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'internal',
            pattern: '@',
            position: 'after',
          },
        ],
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'import/no-unresolved': ['error', { caseSensitiveStrict: true }],

    'unicorn/custom-error-definition': 'error',
    'unicorn/empty-brace-spaces': 'error',
    'unicorn/error-message': 'error',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
      },
    ],
    'unicorn/no-instanceof-array': 'error',
    'unicorn/prefer-keyboard-event-key': 'error',
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/throw-new-error': 'error',

    'check-file/folder-naming-convention': [
      'error',
      {
        'src/**/': 'KEBAB_CASE',
      },
    ],
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
};
