const webpackMerge = require('webpack-merge');
const babelOptions = require('../baseReact/babel.options.js');

module.exports = webpackMerge(babelOptions, {
    plugins: [
        ['/Users/lijun/git/ssr-test/src/app/babelPlug.js', { "isServer": false }],
    ]
})
