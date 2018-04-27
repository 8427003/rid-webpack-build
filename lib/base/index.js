const webpackMerge = require('webpack-merge');

const baseConfig = require('./webpack.base.config.js');
const devConfig = require('./webpack.dev.config.js');
const prodConfig = require('./webpack.prod.config.js');

module.exports = {
    devConfig: webpackMerge(devConfig, baseConfig),
    prodConfig: webpackMerge(prodConfig, baseConfig)
}


