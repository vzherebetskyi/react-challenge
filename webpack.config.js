const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config({ path: '.env' });
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = () => {
  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js/,
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpe?g)$/,
          use: {
            loader: 'file-loader',
            options: {
              outputPath: 'img/',
            },
          },
        },
        {
          test: /\.(woff)$/,
          use: {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts/',
            },
          },
        },
        {
          test: /\.s?css/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: true,
        }),
      ],
    },
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
    },
    node: {
      fs: 'empty',
    },
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$/,
      }),
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(
          process.env.FIREBASE_API_KEY
        ),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(
          process.env.FIREBASE_AUTH_DOMAIN
        ),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(
          process.env.FIREBASE_DATABASE_URL
        ),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(
          process.env.FIREBASE_PROJECT_ID
        ),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(
          process.env.FIREBASE_STORAGE_BUCKET
        ),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(
          process.env.FIREBASE_MESSAGING_SENDER_ID
        ),
        'process.env.FIREBASE_APP_ID': JSON.stringify(
          process.env.FIREBASE_APP_ID
        ),
        'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(
          process.env.FIREBASE_MEASUREMENT_ID
        ),
      }),
      // new CleanWebpackPlugin(),
    ],
  };
};
