const webpack = require('webpack');
const CONFIG = require('../config.js');

module.exports = {

    // relative to context which defiend in webpack.config.js
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /bower_components|node_modules\/(?!(swiper)\/).*/,
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env"],

                    plugins: [
                        //  import() 本来webpack支持，但是用了babel需要插件才能支持了。
                        //  否则报语法错误
                        // presets @babel/preset-stage-2 已经包含了此插件
                        // 这里只是备注说明此插件的重要性
                        //"@babel/plugin-syntax-dynamic-import",

                        "react-hot-loader/babel",

                        // Stage 2
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        "@babel/plugin-proposal-function-sent",
                        "@babel/plugin-proposal-export-namespace-from",
                        "@babel/plugin-proposal-numeric-separator",
                        "@babel/plugin-proposal-throw-expressions",

                        // Stage 3
                        "@babel/plugin-syntax-dynamic-import",
                        "@babel/plugin-syntax-import-meta",
                        ["@babel/plugin-proposal-class-properties", { "loose": false }],
                        "@babel/plugin-proposal-json-strings",

                    ]
                }
            }
        ]
    }
}
