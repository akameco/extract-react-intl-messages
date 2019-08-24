module.exports = {
  testPathIgnorePatterns: [
    '<rootDir>[/\\\\](dist|compiled|node_modules)[/\\\\]'
  ],
  testEnvironment: 'node',
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  }
}
