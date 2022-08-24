module.exports = {
  'package.json': ['npm run format:package'],
  'src/**/*.{ts}': [() => 'npm run lint:ts'],
  'test/**/*.{ts}': [() => 'npm run lint:ts'],
  'prisma/**/*.{ts}': [() => 'npm run lint:ts'],
  'types/**/*.{ts}': [() => 'npm run lint:ts'],
  'src/**/*.{ts,json}': ['prettier --write', 'eslint --fix'],
  'test/**/*.{ts,json}': ['prettier --write', 'eslint --fix'],
  'prisma/**/*.{ts,json}': ['prettier --write', 'eslint --fix'],
  'types/**/*.{ts,json}': ['prettier --write', 'eslint --fix'],
  '*.md': ['prettier --write'],
};
