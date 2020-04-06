const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');

const dev = merge(base, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: base.externals.paths.dist,
        port: 8081,
        overlay: {
            warnings: false,
            errors: true
        },
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
})

module.exports = new Promise((res, rej) => {
    res(dev)
})