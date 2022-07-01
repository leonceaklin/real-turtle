const path = require('path');
const webpack = require('webpack');
// const PrettierPlugin = require("prettier-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const getPackageJson = require('./scripts/getPackageJson');

const {
  version,
  name,
  license,
  repository,
  author,
} = getPackageJson('version', 'name', 'license', 'repository', 'author');

var helperNames = ["simple", "asyncSimple"]

const banner = `
  ${name} v${version}
  ${repository.url}

  Copyright (c) ${author.replace(/ *\<[^)]*\> */g, " ")}

  This source code is licensed under the ${license} license found in the
  LICENSE file in the root directory of this source tree.
`;

var outputs = [
  {
    mode: "production",
    devtool: 'source-map',
    entry: './src/index.js',
    target: "web",
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'build'),
      library: 'RealTurtle',
      libraryTarget: 'umd'
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        extractComments: false
      })],
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
          use: ['url-loader'],
        }
      ]
    },
    plugins: [
      // new PrettierPlugin(),
      new webpack.BannerPlugin(banner)
    ]
  }
];

for (var i = 0; i < helperNames.length; i++) {
  var helperName = helperNames[i]
  var buildFile = {
    mode: "production",
    entry: "./src/helpers/"+helperName+".js",
    output: {
      filename: helperName+'.js',
      path: path.resolve(__dirname, 'build/helpers'),
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        extractComments: false
      })],
    }
  }
  outputs.push(buildFile)
}


module.exports = outputs;
