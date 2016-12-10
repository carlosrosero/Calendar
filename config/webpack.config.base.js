const path = require('path');
const autoprefixer = require('autoprefixer');

const PATHS = {
  app: path.resolve(__dirname, '../src'),
  styles: path.resolve(__dirname, '../src'),
  images: path.resolve(__dirname, '../src/images'),
  build: path.resolve(__dirname, '../build'),
};

module.exports = {
  PATHS: PATHS,
  config: {
    resolve: {
      // We can now require('file') instead of require('file.jsx')
      extensions: ['', '.js', '.jsx', '.scss'],
      alias: {
        actions: PATHS.app + '/actions',
        components: PATHS.app + '/components',
        store: PATHS.app + '/store',
        reducers: PATHS.app + '/reducers',
        helpers: PATHS.app + '/helpers',
        sagas:  PATHS.app + '/sagas',
        styles:  PATHS.app + '/styles',
      },
    },
    postcss: function postcssInit() {
      return [
        autoprefixer({
          browsers: ['last 2 versions'],
        }),
        require('postcss-nested'),
        require('lost'),
        require('postcss-simple-vars')({
          variables: function () {
            return require(PATHS.app + '/styles/colors.js');
          }
      }),
      ];
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: PATHS.app,
        },
        {
          test: /\.css$/,
          exclude: /node_modules.+\.css$/,
          loader: 'style-loader!css-loader?modules&localIdentName=[path][name]__[local]__[hash:base64:5&importLoaders=1!postcss-loader',
        },
        {
          test: /node_modules.+\.css$/,
          loader: 'style-loader!css-loader',
        },
        // Inline base64 URLs for <=8k images, direct URLs for the rest
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=8192',
        },
      ],
    },
  },
};
