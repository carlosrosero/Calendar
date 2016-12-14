var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');

var baseConfig = require('./webpack.config.base');

var config = _.merge({
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    // 'webpack/hot/only-dev-server',
    path.resolve('./src/main.js')
  ],
  cache: true,
  devtool: '#eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    })
  ]
}, baseConfig);

// Add needed loaders
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loaders: ['babel'],
  include: path.join(__dirname, '/../src')
});

module.exports = config;
