module.exports = {
  presets: [
    ['@babel/preset-env',
      {
        useBuiltIns: 'usage', // or "entry"
        corejs: 3,
      },
    ],
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    },
  },
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-export-default-from',
  ],
};
