const path = require('path');
const VueLoaderPlugin = require("vue-loader").VueLoaderPlugin;
const merge = require("webpack-merge");
const path = require('path');
const baseConfig = require("./webpack.config.base");

module.exports = {
  
  mode: 'development',
  entry: {
    client: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-async-to-generator',
              '@babel/babel-plugin-syntax-jsx',
              ["babel-plugin-inferno", {"imports": true}]
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'app'),
    ]
  },
  plugins: [],
  devtool: 'source-map'
};