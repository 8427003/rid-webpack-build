const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CONFIG = require('../config.js');

module.exports = {

    // entry relative to the context, default cwd, it's useful when need independent from CWD
    context: CONFIG.PROJECT_ROOT,

    output: {
        path: CONFIG.DIST_DIR,

        // 如果 publicPath 没有设置，那么index.html 中的js，css等资源路径是一个相对路径,
        // 且相默认对于inde.html(A relative URL is resolved relative to the HTML page)
        // 如果设置，则相当于给了static/xxx.js 一个前缀，对资源生成后的存放路径没影响
        // 默认值区别于devServer的publicPath，devServer不设置，则默认值为‘/’， 这里不设置，相当于
        /// 一个空字符串, 走相对路径
        //
        // 通常如果静态资源（非html 文件）由独立的静态资源服务器提供务，
        // 或者是分配了单独的静态资源访问路径时需要设置此前缀。
        // 通常如果静态资源与html文件保持构建时的目录结构时，走相对路径，无需设置。
        //
        // 由config.js 覆盖
        publicPath: '/', //无其它前缀时，必须为‘/’,否则资源路径错误，出现undefied，待解决
    },
    // mode: 'development',
    // mode: 'development',
    resolve: {
        extensions: ['.js', 'scss', 'css', 'less']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    chunks: 'all',
                }
            }
        },
    },
    module:{
        rules: [
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: `file?name=${CONFIG.FONTS_DIR}/[name].[ext]`
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: `url?limit=1024&name=${CONFIG.IMGS_DIR}/[name].[ext]`
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    // presets 由 .babelrc 配置
                    //
                    plugins: [
                        //  import() 本来webpack支持，但是用了babel需要插件才能支持了。
                        //  否则报语法错误
                        "syntax-dynamic-import",
                    ]
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: "index.html", //生成的html存放路径，相对于output.path
            template: `${CONFIG.SRC_DIR}/index.html`, // 相对cwd
            inject: true
        }),

        // 相当于每个模块顶部var $  = require('jquery');
        // https://webpack.js.org/plugins/provide-plugin/
        // 'window.jQuery': 'jquery' vs  jQuery: "jquery" 二者有区别!
        // 一个是全局，一个是模块内。所以这里的变量注入是在每个模块内完成的！
        //new webpack.ProvidePlugin({
        //$: "jquery",
        //jQuery: "jquery",
        //'window.jQuery': 'jquery'
        //}),
    ],
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
}
