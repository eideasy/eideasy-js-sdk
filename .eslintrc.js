module.exports = {
  env: {
    browser: true,
    'jest/globals': true,
  },
  extends: 'airbnb-base',
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['build-utils/**/*.js', 'webpack.config.js'] }],
    'no-console': 0,
    'no-unused-vars': 'warn',
    'class-methods-use-this': 0,
    'max-len': ['warn', { code: 120 }],
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
  plugins: ['jest'],
};
