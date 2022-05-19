import { writeFileSync } from 'fs';

import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
// eslint-disable-next-line import/no-extraneous-dependencies
import swaggerJsdoc from 'swagger-jsdoc';

import { name, version } from './package.json';

const result: DotenvConfigOutput = config();
const conf = result.parsed as DotenvParseOutput;

const options = {
  swaggerDefinition: {
    basePath: '/api/v1',
    openapi: '3.0.0',
    host: conf.HOST as string,
    schemes: [conf.PROTOTCOL as string],
    info: {
      title: name,
      version,
    },
  },
  apis: ['./src/errors/error-types/**/*.error.ts', './src/**/*.controller.ts'],
};

const openapiSpecification = swaggerJsdoc(options);
writeFileSync('src/openapi.json', JSON.stringify(openapiSpecification, null, 2));
