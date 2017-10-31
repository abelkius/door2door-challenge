const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

module.exports = {
  entry: ['webpack/hot/poll?1000', './lib/index'],
  target: 'node',
  devtool: 'sroucemap',
  watch: true,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js'
  },
  node: {
    __filename: true,
    __dirname: true
  },
  externals: [nodeExternals({whitelist: ['webpack/hot/poll?1000']})],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [['env', {modules: false}], 'stage-0'],
              plugins: ['transform-regenerator', 'transform-runtime']
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        include: [path.join(__dirname, 'lib'), path.join(__dirname, 'app')],
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitError: true,
          emitWarning: true
        }
      }
    ]
  },
  plugins: [
    new StartServerPlugin('server.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {BUILD_TARGET: JSON.stringify('server')}
    }),
    new webpack.BannerPlugin({banner: 'require("source-map-support").install();', raw: true, entryOnly: false})
  ]
};
