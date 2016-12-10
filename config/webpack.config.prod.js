/* eslint prefer-template: "off", object-shorthand: "off" */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const _ = require('lodash');
const baseConfig = require('./webpack.config.base.js');

// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = [
  new CopyWebpackPlugin([
    {
      from: baseConfig.PATHS.images,
      to: 'images',
    },
  ]),
  // Shared code
  new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
  // Avoid publishing files when compilation fails
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    __BASENAME__: JSON.stringify('educational/react-calendar-app/build'),
    // 'process.env.NODE_ENV': JSON.stringify('production'),
    // __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
  // This plugin moves all the CSS into a separate stylesheet
  // new ExtractTextPlugin('css/app.css', {allChunks: true}),
];
module.exports = _.merge(baseConfig.config, {
  entry: {
    app: path.resolve(baseConfig.PATHS.app, 'main.js'),
    vendor: ['react'],
  },
  // entry: path.resolve(baseConfig.PATHS.app, 'main.js'),
  output: {
    path: baseConfig.PATHS.build,
    filename: 'js/[name].js',
    publicPath: '/',
  },
  stats: {
    colors: true,
  },
  resolve: {
    // We can now require('file') instead of require('file.jsx')
    extensions: ['', '.js', '.jsx', '.scss', '.css'],
  },
  module: {
    noParse: /\.min\.js$/,
  },
  plugins: plugins,
  // TODO: do we need this for production?
  // devtool: 'source-map',
});
