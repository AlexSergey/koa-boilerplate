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
  ignorePatterns: [
    '.eslintrc.js'
  ],
  plugins: [
    'import',
    'unicorn',
    '@typescript-eslint'
  ],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: [
          'node_modules',
          'src'
        ],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx'
        ]
      }
    }
  },
  overrides: [
    {
      files: [
        'jest.config.ts',
        'jest.e2e.config.ts'
      ],
      rules: {
        'import/no-default-export': 'off'
      }
    },
    {
      files: [
        '**/**/*.json'
      ],
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
        'prettier/prettier': 'off'
      }
    }
  ],
  rules: {
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false
      }
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always'
      }
    ],
    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'off'
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'warn'
    ],
    'class-methods-use-this': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        useTabs: false,
        semi: true,
        trailingComma: 'all',
        bracketSpacing: true,
        printWidth: 120,
        endOfLine: 'lf'
      }
    ],
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase'
      }
    ],
    '@typescript-eslint/return-await': 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true
      }
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: [ 'PascalCase' ],
        custom: {
          regex: '.*Interface',
          match: true
        }
      },
      {
        selector: 'typeAlias',
        format: [ 'PascalCase' ],
        custom: {
          regex: '.*Type',
          match: true
        }
      }
    ]
  }
}
