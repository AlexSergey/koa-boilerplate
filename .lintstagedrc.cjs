module.exports = {
  '*.md': ['prettier --write'],
  'package.json': ['npm run format:package'],
  'prisma/**/*.{ts,json}': ['prettier --write', 'eslint --fix'],
  'prisma/**/*.ts': [() => 'npm run lint:ts'],
  'src/**/*.{ts,json}': ['prettier --write', 'eslint --fix'],
  'src/**/*.ts': [() => 'npm run lint:ts'],
  'test/**/*.{ts,json}': ['prettier --write', 'eslint --fix'],
  'test/**/*.ts': [() => 'npm run lint:ts'],
  'types/**/*.{ts,json}': ['prettier --write', 'eslint --fix'],
  'types/**/*.ts': [() => 'npm run lint:ts'],
};
