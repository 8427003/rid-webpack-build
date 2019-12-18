const webpack = require('webpack');
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
    resolve: {
        extensions: ['.js', 'scss', 'css', 'less']
    },
    module:{
        rules: [
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                }
            },
            {
                test: /\.js$/,
                exclude: /bower_components|node_modules\/(?!(swiper)\/).*/,
                loader: 'babel-loader',

                // options的value最好放到 .babelrc 配置管理
                // 以便测试环境能复用
                options: {

                    presets: ["@babel/preset-env", "@babel/preset-react"],

                    plugins: [
                        //  import() 本来webpack支持，但是用了babel需要插件才能支持了。
                        //  否则报语法错误
                        // presets @babel/preset-stage-2 已经包含了此插件
                        // 这里只是备注说明此插件的重要性
                        //"@babel/plugin-syntax-dynamic-import",
                        //
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

                        //swiper
                        "@babel/plugin-transform-exponentiation-operator",
                        ['/Users/lijun/git/ssr-test/src/app/babelPlug.js', { "isServer": false }],
                    ]
                }
            }
        ]
    },
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {
                NODE_PROFILE: `"${ process.env.NODE_PROFILE ? process.env.NODE_PROFILE : '' }"`,
            }
        }),
    ],
}
