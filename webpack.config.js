const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const modeConfig = (env) => require(`./build-utils/webpack.${env}`)(env);
const presetConfig = require('./build-utils/loadPresets');
const generateHtmlPlugins = require('./build-utils/generateHtmlPlugins');

const htmlPlugins = generateHtmlPlugins(path.resolve(__dirname, 'src/views'));

module.exports = ({
  mode,
  presets,
} = {
  mode: 'production',
  presets: [],
}) => merge(
  {
    mode,
    stats: {
      chunks: true,
    },
    entry: `./src/index-${mode}.js`,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'eideasy-js-sdk.js',
      library: 'eIDEasy',
      libraryTarget: 'umd',
    },
    devServer: {
      contentBase: './dist',
    },
    plugins: [
      new CleanWebpackPlugin(),
      ...htmlPlugins,
      new ESLintPlugin(),
      new webpack.ProgressPlugin(),
    ],
  },
  modeConfig(mode),
  presetConfig({ mode, presets }),
);
