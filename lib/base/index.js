/**
 * 1. mock
 * 2. css modlue, less, scss
 * 3. 打包资源路径
 *
 **/
const webpackMerge = require('webpack-merge');

const baseConfig = require('./webpack.base.config.js');
const devConfig = require('./webpack.dev.config.js');
const prodConfig = require('./webpack.prod.config.js');

module.exports = {
    devConfig: webpackMerge(baseConfig, devConfig),
    prodConfig: webpackMerge(baseConfig, prodConfig),
}
