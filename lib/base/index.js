const webpackMerge = require('webpack-merge');

const baseConfig = require('./webpack.base.config.js');
const devConfig = require('./webpack.dev.config.js');
const prodConfig = require('./webpack.prod.config.js');

module.exports = {
    devConfig: webpackMerge.strategy({
        plugins: 'replace',
    })(baseConfig, devConfig),

    prodConfig: webpackMerge.strategy({
        plugins: 'replace',
    })(baseConfig, prodConfig),
}


