// eslint-disable-next-line node/no-extraneous-import
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '<rootDir>/coverage/e2e',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  preset: 'ts-jest',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  verbose: true,
};

export default config;
