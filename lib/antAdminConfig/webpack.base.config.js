const webpack = require('webpack');

module.exports = {
    // relative to context which defiend in webpack.config.js
    entry: {
        "react": [
            'react',
            'react-dom',
            'react-router',
            'antd'
        ]
    },
    plugins:[
        // names 顺序与html inject顺序相反
        new webpack.optimize.CommonsChunkPlugin({
            name: ["react"],
            minChunks: Infinity
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    plugins: [
                        //  babel-plugin-import
                        // import antd 模块的同时，加载css文件
                        ["import", {"libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
                    ]
                }
            }
        ]
    }
}
