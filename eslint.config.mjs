import tsParser from '@typescript-eslint/parser';
import checkFile from 'eslint-plugin-check-file';
import json from 'eslint-plugin-json';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import * as regexpPlugin from 'eslint-plugin-regexp';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import eslintTs from 'typescript-eslint';

const ignores = [
  '**/*.d.ts',
  '*.d.ts',
  'node_modules',
  'logs',
  '*.log',
  'lib-cov/',
  'coverage/',
  'NO_COMMIT/',
  'test-reports/**',
  'docs/*',
  'build/*',
  'lib/*',
  'dist/*',
  '*.css',
  '*.scss',
  '*.less',
  '*.ico',
  '*.jpg',
  '*.jpeg',
  '*.png',
  '*.svg',
  '*.bmp',
  '*.gif',
  '*.webp',
  '*.woff',
  '*.woff2',
  '*.txt',
  '*.mdx',
  '*.md',
  '*.json',
  '*.ejs',
  '*.hbs',
  '*.jade',
  '*.html',
  'docs/',
  'public/',
  'locales/',
  'src/locales/',
  'seo_report',
];
const tsFiles = ['**/*.ts'];

const defaultEnv = 'production';
const supportedEnvs = ['development', 'production'];
const currentEnv = supportedEnvs.includes(process.env.NODE_ENV) ? process.env.NODE_ENV : defaultEnv;
const isDevelopment = currentEnv === 'development';

const languageOptions = {
  ecmaVersion: 2024,
  globals: {
    ...globals.node,
    ...globals.jest,
  },
  sourceType: 'module',
};

const customTypescriptConfig = {
  files: tsFiles,
  languageOptions: {
    ...languageOptions,
    parser: tsParser,
    parserOptions: {
      project: './tsconfig.json',
    },
  },
  plugins: {
    'check-file': checkFile,
    'import/parsers': tsParser,
    unicorn: eslintPluginUnicorn,
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': isDevelopment ? 'off' : 'error',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        format: ['UPPER_CASE', 'StrictPascalCase'],
        prefix: ['I'],
        selector: 'interface',
      },
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': isDevelopment
      ? 'off'
      : [
          'error',
          {
            args: 'after-used',
            ignoreRestSiblings: false,
            vars: 'all',
          },
        ],
    '@typescript-eslint/return-await': 'off',

    camelcase: ['error', { properties: 'always' }],

    'check-file/filename-naming-convention': [
      'error',
      {
        'src/**/*.{ts,tsx}': 'KEBAB_CASE',
      },
      {
        ignoreMiddleExtensions: true,
      },
    ],
    'check-file/folder-naming-convention': [
      'error',
      {
        'src/**/': 'KEBAB_CASE',
      },
    ],

    'class-methods-use-this': 'off',
    'newline-before-return': 'error',
    'no-alert': isDevelopment ? 'off' : 'error',
    'no-await-in-loop': 'off',
    'no-console': isDevelopment ? 'off' : 'error',
    'no-debugger': isDevelopment ? 'off' : 'error',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-return-await': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    'no-warning-comments': 'warn',

    'unicorn/custom-error-definition': 'error',
    'unicorn/empty-brace-spaces': 'error',
    'unicorn/error-message': 'error',
    'unicorn/no-instanceof-array': 'error',
    'unicorn/prefer-keyboard-event-key': 'error',
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/throw-new-error': 'error',
  },
};

// Add the files for applying the recommended TypeScript configs
// only for the Typescript files.
// This is necessary when we have the multiple extensions files
// (e.g. .ts, .tsx, .js, .cjs, .mjs, etc.).
const recommendedTypeScriptConfigs = [
  ...eslintTs.configs.recommended.map((config) => ({
    ...config,
    files: tsFiles,
  })),
  ...eslintTs.configs.stylistic.map((config) => ({
    ...config,
    files: tsFiles,
  })),
];

export default [
  { ignores },
  ...recommendedTypeScriptConfigs,
  prettierRecommended,
  perfectionist.configs['recommended-natural'],
  regexpPlugin.configs['flat/recommended'],
  json.configs['recommended'],
  customTypescriptConfig,
];
