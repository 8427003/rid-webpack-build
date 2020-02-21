const webpackMerge = require('webpack-merge');
const babelOptions = require('../baseReact/babel.options.js');

module.exports = webpackMerge(babelOptions, {
    plugins: [
        // import antd 模块的同时，加载css文件
        ["import", {"libraryName": "antd", "libraryDirectory": "es", "style": "css" }],
    ]
})
