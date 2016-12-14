var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var WebpackStrip = require('webpack-strip')
var baseConfig = require('./webpack.config.base.js');

var config = _.merge({
  entry: path.join(__dirname, '../src/main'),
  cache: true,
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      __BASENAME__: JSON.stringify(process.env.PROJECT_SUBDIR || ''),
      // 'process.env.NODE_ENV': '"production"',
      // __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      sourcemap: false,
      compress: {
        warnings: false,
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin()
  ]
}, baseConfig);

config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: path.join(__dirname, '/../src')
}, {
  test: /\.js$/, loader: WebpackStrip.loader('debug', 'console.log', 'console.debug')
});

module.exports = config;
