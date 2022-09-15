module.exports = {
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup-jest.ts'],
  roots:['src'],
  modulePaths: [
    "<rootDir>"
  ],
  testMatch: [
    "**/src/**/*.spec.ts"
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
        /* '^.+\\.jsx?$': 'babel-jest', */
        '.+\\.(css|styl|less|sass|scss)$':
            '<rootDir>/node_modules/jest-css-modules-transform'
  },
  transformIgnorePatterns: [
    `node_modules/(?!@angular|@ngneat/spectator|@ngx-translate|array-move|lodash-es|(?!lit-element).+\\.js$)`,
    /* './node_modules/',
    '/node_modules/(?!CCSResult).+\\.js$',
    '/node_modules/(?!html).+\\.js$',
    '/node_modules/(?!css).+\\.js$',
    '/node_modules/(?!lit-element).+\\.js$',
    '/node_modules/(?!lit-html).+\\.js',
    '/node_modules/(?!lit-boilerplate).+\\.js' */
],
testPathIgnorePatterns: ['/node_modules/', '/bin/'],
coveragePathIgnorePatterns: ['/node_modules/', '/bin/'],
collectCoverageFrom: [
  '**/*.{js,jsx}',
  '!**/node_modules/**',
  '!**/vendor/**',
  '!**/bin/**'
],
collectCoverage: true,
};