/**
 * technology  stack
 *
 * react
 * react-dom
 * scss, less, css module
 */
const webpackMerge = require('webpack-merge');
const webpackBase = require('../baseReact');

const baseConfig  = require('./webpack.base.config.js');
const prodConfig = require('./webpack.prod.config.js');
const devConfig = require('./webpack.dev.config.js');

module.exports = {
    devConfig:  webpackMerge.smart(webpackBase.devConfig, baseConfig, devConfig),
    prodConfig: webpackMerge.smart(webpackBase.prodConfig, baseConfig, prodConfig),
}
