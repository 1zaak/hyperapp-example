const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const plugins = [
  // new ExtractTextPlugin({
  //   filename: 'bin/bundle.css',
  //   allChunks: true,
  // }),
  // new webpack.optimize.ModuleConcatenationPlugin(),
];

module.exports = function webpackStuff(env) {
  if (env === 'production') plugins.push(new MinifyPlugin());

  return {
    entry: [
      './src/index.js'
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
      },{
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }],
    },
    plugins,
  };
};