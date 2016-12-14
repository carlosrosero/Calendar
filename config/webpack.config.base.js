var path = require('path');
var port = 3000;
var srcPath = path.join(__dirname, '/../src');
var publicPath = '/js/';

module.exports = {
  port: port,
  debug: true,
  output: {
    path: path.join(__dirname, '/../build'),
    filename: 'js/app.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../src'),
    historyApiFallback: true,
    hot: true,
    port: port,
    // publicPath: publicPath,
    noInfo: true
  },
  resolve: {
    extensions: [
      '',
      'index.js',
      '.js',
      '.jsx'
    ],
    alias: {
      actions: srcPath + '/actions/',
      components: srcPath + '/components/',
      store: srcPath + '/store/',
      reducers: srcPath + '/reducers/',
      styles: srcPath + '/styles/',
      helpers: srcPath + '/helpers/',
      sagas: srcPath + '/sagas/',
    }
  },
  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      include: path.join(__dirname, 'src'),
      loader: 'babel-loader'
    }],
    loaders: [{
      test: /\.css$/,
      exclude: /node_modules.+\.css$/,
      loader: 'style-loader!css-loader?modules&localIdentName=[path][name]__[local]__[hash:base64:5&importLoaders=1!postcss-loader'
    },
    {
      test: /node_modules.+\.css$/,
      loader: 'style-loader!css-loader',
    },
    // Inline base64 URLs for <=8k images, direct URLs for the rest
    {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=8192',
    }, {
      test: /\.(json)$/,
      loader: 'json-loader'
    }]
  },
  postcss: function () {
    return [
      require('lost'),
      require('postcss-simple-vars')({}),
      require('postcss-nested'),
    ];
  }
};
