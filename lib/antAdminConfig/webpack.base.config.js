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
                    presets: ["env", "react", "stage-2"],
                    plugins: [

                        "syntax-dynamic-import",
                        //  babel-plugin-import
                        // import antd 模块的同时，加载css文件
                        ["import", {"libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
                    ]
                }
            }
        ]
    }
}
