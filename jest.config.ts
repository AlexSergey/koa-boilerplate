import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';
import { loadConfig } from 'tsconfig-paths';

const tsconfig = loadConfig() as { paths: Record<string, string[]> };

const config: Config.InitialOptions = {
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '<rootDir>/coverage/unit',
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.paths) as { [key: string]: string | string[] },
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  verbose: true,
};

export default config;
