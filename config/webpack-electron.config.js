const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const outputDirectory = 'src/electron/dist';
const projectRoot = path.resolve(__dirname, '..');

function buildConfig(env, argv) {

  return {
    name: 'base',
    context: projectRoot,
    target: "electron-main",
    entry: {
      application: './src/client/entries/application.js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: ['node_modules', "src/client"]
    },
    output: {
      path: path.join(projectRoot, outputDirectory),
      filename: '[name].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000'
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin([outputDirectory]),
      new ManifestPlugin({
        writeToFileEmit: true
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  };
}
 
module.exports = buildConfig;
