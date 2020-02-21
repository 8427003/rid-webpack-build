const webpackMerge = require('webpack-merge');
const babelOptions = require('../base/babel.options.js');

module.exports = webpackMerge(babelOptions, {
    presets: ["@babel/preset-react"],
    plugins: [
        // add plugins from base
        "react-hot-loader/babel",
    ]
})
