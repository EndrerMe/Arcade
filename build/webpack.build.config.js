const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const TerserPlugin = require('terser-webpack-plugin');

const build = merge(base, {
    mode: 'production',
    optimization: {
        minimizer: [
          new TerserPlugin({
            sourceMap: true,
            terserOptions: {
              compress: {
                drop_console: true,
              },
            },
          }),
        ],
    },
})

module.exports = new Promise((res, rej) => {
    res(build)
})