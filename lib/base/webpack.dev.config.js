/*
 * @overview
 *
 * @author
 * @version 2017/11/14
 */
const webpack = require('webpack');
const Mock = require('webpack-dev-server-simple-mock');
const CONFIG = require('../config.js');
const moduleCssLoader = 'css-loader?modules&importLoaders=1&localIdentName=[path][name]__[local]--[hash:base64:5]'

module.exports = {
    output: {
        filename: `${CONFIG.JS_DIR}/[name].[hash:8].js`
    },
    devServer: {

        // build后打开浏览器
        open: true,

        // 打开浏览器的路径
        // 由config.file覆盖
        // openPage: 'internal/',

        // 打开浏览器用本地ip作为host
        useLocalIp: true,

        hot: true,

        // 这个变量的意思相当于nginx，
        //  location ${publicPath} {
        //      root   ${output.path};
        //  }
        // (特殊的)这里的output.path是放在内存中的
        //
        //  所以contentBase不用设置${output.path}
        // default the publicPath is "/"
        // 由config.file覆盖
        //publicPath:'/internal/',

        // 其它的contentBaset自定义的静态资源目录不受publicPath影响,
        // 且contentBase 所包括的文件夹中的所有文件，统一访问路径为'/'
        // 意味着你可以通过/api.js 访问到mock/api.js,
        // 通过/public.js 访问到PUBLIC_DIR/public.js
        // 这个变量的意思相当于nginx，
        //  location / {
        //      root   ${contentBase};
        //  }
        //
        // 如果publicPath也设置为/根路径，那么publicPath对应的资源也就是${output.path}优先级高
        // 官方文档有描述https://webpack.js.org/configuration/dev-server/#devserver-contentbase
        //
        //contentBase: [
        //],

        //不check host,自己可以改hosts文件来绑定域名
        disableHostCheck: true,

        // 0.0.0.0 可以外部访问
        host: '0.0.0.0',

        // PUBLIC_DIR
        before: function (app){
            app.use(
                `${this.publicPath}${CONFIG.PUBLIC_FILE_NAME}`,

                // 不用管理express依赖，DevServer已经依赖
                require('express').static(CONFIG.PUBLIC_DIR)
            )
        },
        proxy: [
            {
                context: ['/**'],
                bypass: Mock(CONFIG.MOCK_API_JSON_FILE)
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"development"`,
            },
        })
    ],
    module: {
        rules: [
            {
                test:  /^(?!.*?\.module).*\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test:  /\.module\.css$/,
                use: ['style-loader', moduleCssLoader]
            },

            {
                test: /^(?!.*?\.module).*\.less/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test:  /\.module\.less$/,
                use: ['style-loader', moduleCssLoader, 'less-loader']
            },

            {
                test: /^(?!.*?\.module).*\.scss/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test:  /\.module\.scss$/,
                use: ['style-loader', moduleCssLoader, 'sass-loader']
            },

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
    }
}
