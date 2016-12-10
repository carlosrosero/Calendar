/* eslint prefer-template: "off", object-shorthand: "off" */
const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');
const baseConfig = require('./webpack.config.base.js');

const plugins = [
  // Shared code
  new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
  // Avoid publishing files when compilation fails
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
];

module.exports = _.merge(baseConfig.config, {
  env: process.env.NODE_ENV,
  entry: {
    app: path.resolve(baseConfig.PATHS.app, 'main.js'),
    vendor: ['react'],
  },
  output: {
    path: baseConfig.PATHS.build,
    filename: 'js/[name].js',
    publicPath: '/',
  },
  stats: {
    colors: true,
    reasons: true,
  },
  plugins: plugins,
  devServer: {
    contentBase: path.resolve(__dirname, '../src'),
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
  devtool: 'eval',
});
