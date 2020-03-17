const webpackMerge = require('webpack-merge');
const babelOptions = require('../baseReact/babel.options.js');
const ssrBabelPluginEnhancedImport = require('@sukbta/ssr-babel-plugin-enhanced-import');

module.exports = webpackMerge(babelOptions, {
    plugins: [
        [ssrBabelPluginEnhancedImport, { "isServer": false }],
    ]
})
