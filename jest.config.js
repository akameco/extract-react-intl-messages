export default {
  testPathIgnorePatterns: [
    '<rootDir>[/\\\\](dist|compiled|node_modules)[/\\\\]'
  ],
  testEnvironment: 'node',
  preset: 'ts-jest',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          module: 'esnext'
        }
      }
    ]
  },
  transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$))']
}
