module.exports = {
  testEnvironment: 'node',
  verbose: false,
  collectCoverageFrom: ['src/**/*.js'],
  transform: { '.*': './node_modules/babel-jest' }
}
