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
    // relative to context which defiend in webpack.config.js
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    plugins: [
                        // import antd 模块的同时，加载css文件
                        ["import", {"libraryName": "antd", "libraryDirectory": "es", "style": "css" }],
                    ]
                }
            }
        ]
    }
}
