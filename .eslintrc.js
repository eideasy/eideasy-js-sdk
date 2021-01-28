module.exports = {
  extends: 'airbnb-base',
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['build-utils/**/*.js', 'webpack.config.js'] }],
    'no-console': 0,
    'no-unused-vars': 'warn',
  },
};
