module.exports = {
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
                exclude: /bower_components|node_modules\/(?!(swiper)\/).*/,
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
