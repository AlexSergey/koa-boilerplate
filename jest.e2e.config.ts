import type { Config } from '@jest/types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const config: Config.InitialOptions = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  preset: 'ts-jest',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths) as { [key: string]: string | string[] },
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '<rootDir>/coverage/e2e',
};

export default config;
