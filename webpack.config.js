const path = require('path');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  entry: WebpackWatchedGlobEntries.getEntries([
    path.resolve('./shop/src/dev/js/modules/*.js'),
    path.resolve('./shop/src/dev/styles/apps/*.scss'),
    path.resolve('./shop/src/dev/styles/base/*.scss'),
    path.resolve('./shop/src/dev/styles/components/*.scss'),
    path.resolve('./shop/src/dev/styles/sections/*.scss'),
    path.resolve('./shop/src/dev/styles/templates/*.scss')
  ]),
  mode: 'development',
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          path.resolve('./shop/src/dev/js/modules/theme.js'),
          path.resolve('./shop/src/dev/js/modules/vendor-scripts-v6.js'),
          path.resolve('./shop/src/dev/js/modules/boost-pfs-core.js'),
          path.resolve('./shop/src/dev/js/modules/boost-pfs-vendor.js'),
        ],
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css%/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin({
      test: /\.js(\?.*)?$/i,
      exclude: path.resolve('./shop/src/dev/js/vendor'),
      parallel: true,
      extractComments: false,
    })],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          type: 'css/mini-extract'
        }
      }
    }
  },
  output: {
    path: path.resolve('./shop/dist/assets'),
    filename: '[name].min.js'
  },
  plugins: [
    new ESLintPlugin({
      context: 'shop/src',
      files: ['**/*.js'],
      failOnError: false
    }),
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].min.css'
    }),
    // new StyleLintPlugin({
    //   configFile: '.stylelintrc.json',
    //   context: 'shop/src',
    //   files: ['**/*.css', '**/*.scss'],
    //   failOnError: false
    // }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('./shop/src/dev/js/static'),
          to: path.resolve('./shop/dist/assets'),
        },
        {
          from: path.resolve('./shop/src/dev/styles/static'),
          to: path.resolve('./shop/dist/assets'),
        }
      ],
    }),
    new BundleAnalyzerPlugin()
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
  }
};
