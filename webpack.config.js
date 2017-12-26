const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin")
const Dotenv = require('dotenv-webpack');

const plugins = [
  // new ExtractTextPlugin({
  //   filename: 'bin/bundle.css',
  //   allChunks: true,
  // }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new CompressionPlugin({
    algorithm: 'gzip',
    cache: true,
    test: /\.(css|js)$/,
  })
  // new BundleAnalyzerPlugin()
];

module.exports = function webpackStuff(env) {
  if (env === 'production') {
    plugins.push(new MinifyPlugin());
    plugins.push(new Dotenv({
      path: './.env.production'      
    }))
  } else {
    plugins.push(new Dotenv({
      path: './.env.local' 
    }))
  }
  return {
    entry: [
      'babel-polyfill',
      './src/index.js',
      './src/_styles/main.scss'
    ],
    output: {
      filename: 'bin/bundle.js',
      path: path.resolve(__dirname, './'),
    },
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015',
          ],
          plugins: [],
        },
        include: [
          path.resolve(__dirname, './'),
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
              outputPath: 'bin/'
            }
          },
          {
            loader: 'clean-css-loader',
            options: {
              compatibility: 'ie9',
              level: 2,
              inline: ['remote']
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader', 
            options: { minimize: true }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
  ],
    },
    plugins,
    devServer: {
      port: 8080,
      historyApiFallback: {
        index: 'index.html',
      }
    }
  };
};