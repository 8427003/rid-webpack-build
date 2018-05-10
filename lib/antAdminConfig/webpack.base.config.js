const webpack = require('webpack');

module.exports = {
    // relative to context which defiend in webpack.config.js
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react", ["@babel/preset-stage-2", {
                        decoratorsLegacy: true
                    }]],

                    plugins: [
                        //  import() 本来webpack支持，但是用了babel需要插件才能支持了。
                        //  否则报语法错误
                        // presets @babel/preset-stage-2 已经包含了此插件
                        // 这里只是备注说明此插件的重要性
                        //"@babel/plugin-syntax-dynamic-import",

                        "react-hot-loader/babel",

                        //  babel-plugin-import
                        // import antd 模块的同时，加载css文件
                        ["import", {"libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
                    ]
                }
            }
        ]
    }
}
