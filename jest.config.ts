// eslint-disable-next-line node/no-extraneous-import
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '<rootDir>/coverage/unit',
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  verbose: true,
};

export default config;
