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
  },
};
