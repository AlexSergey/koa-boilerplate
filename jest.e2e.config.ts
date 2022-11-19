import type { Config } from '@jest/types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { pathsToModuleNameMapper } from 'ts-jest';
import { loadConfig } from 'tsconfig-paths';

const tsconfig = loadConfig() as { paths: Record<string, string[]> };

const config: Config.InitialOptions = {
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '<rootDir>/coverage/e2e',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.paths) as { [key: string]: string | string[] },
  preset: 'ts-jest',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  verbose: true,
};

export default config;
