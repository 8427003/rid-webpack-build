/**
 * technology  stack
 *
 * react
 * react-dom
 * scss, less, css module
 */
const webpackMerge = require('webpack-merge');
const webpackBase = require('../base');

const baseConfig  = require('./webpack.base.config.js');
const prodConfig = require('./webpack.prod.config.js');
const devConfig = require('./webpack.dev.config.js');

module.exports = {
    devConfig:  webpackMerge(webpackBase.devConfig, webpackMerge.smart(baseConfig, devConfig)),
    prodConfig: webpackMerge(webpackBase.prodConfig, webpackMerge.smart(baseConfig, prodConfig)),
}
