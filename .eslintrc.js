module.exports = {
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['build-utils/**/*.js', 'webpack.config.js'] }],
    'no-console': 0,
    'no-unused-vars': 'warn',
    'class-methods-use-this': 0,
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
  },
};
