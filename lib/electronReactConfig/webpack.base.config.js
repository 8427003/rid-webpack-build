const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CONFIG = require('../config.js');

module.exports = {
    target: 'electron-renderer',
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    chunks: 'all'
                }
            }
        },
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: "index.html", //生成的html存放路径，相对于output.path
            template: `${CONFIG.SRC_DIR}/index.html`, // 相对cwd
        }),
    ],
    resolve: {
        //  可以利用别名来指向min.js，防止require三方依赖时，解析三方内部依赖！
        alias: {
            react$: path.resolve(CONFIG.PROJECT_ROOT, 'node_modules/react/cjs/react.production.min.js'),
            "react-dom$": path.resolve(CONFIG.PROJECT_ROOT, 'node_modules/react-dom/cjs/react-dom.production.min.js'),
        },
    },
    // relative to context which defiend in webpack.config.js
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],

                    plugins: [
                        //  import() 本来webpack支持，但是用了babel需要插件才能支持了。
                        //  否则报语法错误
                        // presets @babel/preset-stage-2 已经包含了此插件
                        // 这里只是备注说明此插件的重要性
                        //"@babel/plugin-syntax-dynamic-import",

                        "react-hot-loader/babel",

                        //  babel-plugin-import
                        // import antd 模块的同时，加载css文件
                        ["import", {"libraryName": "antd", "libraryDirectory": "es", "style": "css" }],

                        // Stage 2
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        "@babel/plugin-proposal-function-sent",
                        "@babel/plugin-proposal-export-namespace-from",
                        "@babel/plugin-proposal-numeric-separator",
                        "@babel/plugin-proposal-throw-expressions",

                        // Stage 3
                        "@babel/plugin-syntax-dynamic-import",
                        "@babel/plugin-syntax-import-meta",
                        ["@babel/plugin-proposal-class-properties", { "loose": true }],
                        "@babel/plugin-proposal-json-strings",
                    ]
                }
            }
        ]
    }
}
