const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const copyWebpackPlugin = require('copy-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets',
}

module.exports = {
  externals: {
    paths: paths,
  },
  entry: {
      app: `${paths.src}/app.ts`
  },
  output: {
    filename: `${paths.assets}/js/[name].js`,
    path: paths.dist,
    publicPath: '/'
  },
  resolve: {
    modules: [path.resolve(__dirname, './../src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      src: path.resolve(__dirname, './../src'),
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.scss?$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${paths.assets}/css/[name].css`
    }),
    new htmlWebpackPlugin({
      hash: false,
      template: `${paths.src}/index.html`,
      filename: `./index.html`
    }),
    new copyWebpackPlugin([
      {
        from: `${paths.src}/shared/assets/img`,
        to: `${paths.assets}/img`,
      },
      {
        from: `${paths.src}/static`,
        to: ``,
      },
      {
        from: `${paths.src}/shared/assets/sound`,
        to: `${paths.assets}/sound`,
      },
    ]),
  ]
};
