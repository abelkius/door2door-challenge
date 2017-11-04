const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: ['webpack-dev-server/client?http://localhost:4000', './client/App.jsx'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  devServer: {
    contentBase: './public',
    publicPath: './public',
    inline: true,
    port: 4000
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.jsx?$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/
      // },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              'react',
              [
                'env',
                {
                  targets: {
                    borwsers: 'last 2 versions'
                  },
                  loose: true,
                  modules: false
                }
              ]
            ]
          }
        }
      }
    ]
  }
};
