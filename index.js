/*
 * @overview
 *
 * @author
 * @version 2017/11/14
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-css-chunks-webpack-plugin");
const FlushCssChunksWebpackPlugin = require('flush-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Mock = require('webpack-dev-server-simple-mock');
const webpackMerge = require('webpack-merge');
// const customConfig = require('./config.js');
const isPlainObject = require('lodash/isPlainObject');
const get = require('lodash/get');



// project root path
const PROJECT_ROOT = path.resolve(__dirname, '../../');
console.log(PROJECT_ROOT, 11111);

// project src path, relative to PROJECT_ROOT, default PROJECT_ROOT/src
const SRC_DIR = path.resolve(PROJECT_ROOT, "./src");

// project dist path, relative to PROJECT_ROOT, default PROJECT_ROOT/dist
const DIST_DIR = path.resolve(PROJECT_ROOT, "./dist");


// the public filename relative to PROJECT_ROOT
const PUBLIC_FILE_NAME = 'public';

// public source file, when prod, this folder will be copyed to DIST_DIR
// relative to PROJECT_ROOT, default PROJECT_ROOT/PUBLIC_FILE_NAME
const PUBLIC_DIR = path.resolve(PROJECT_ROOT, PUBLIC_FILE_NAME)

// copy PROJECT_ROOT/PUBLIC_DIR_NAME/** not include the 'PUBLIC_FILE_NAME' folder to PUBLIC_DIST_DIR/
const PUBLIC_DIST_DIR = path.resolve(DIST_DIR, PUBLIC_FILE_NAME);


// mock file, relative to PROJECT_ROOT, default PROJECT_ROOT/mock/api.json
// if the file is no exist, mock system will ignore
const MOCK_API_JSON_FILE = path.resolve(PROJECT_ROOT, './mock/api.json');


// belows when is prod, static file emit path, relative to DIST_DIR
//
// font files emit path, relative to DIST_DIR, default PROJECT_ROOT/DIST_DIR/static/fonts
const FONTS_DIR = 'static/fonts';

// image files emit path, relative to DIST_DIR, default PROJECT_ROOT/DIST_DIR/static/imgs
const IMGS_DIR = 'static/imgs';

// js files emit path, relative to DIST_DIR, default PROJECT_ROOT/DIST_DIR/static/js
const JS_DIR = 'static/js';

// css files emit path, relative to DIST_DIR, default PROJECT_ROOT/DIST_DIR/static/css
const CSS_DIR = 'static/css';



module.exports = function (env={}){

    const config = {

        // relative to context which defiend in webpack.config.js
        entry: {
            "react": [
                'react',
                'react-dom',
                'react-router',
                'antd'
            ]
        },

        // entry relative to the context, default cwd, it's useful when need independent from CWD
        context: PROJECT_ROOT,

        output: {
            path:  DIST_DIR,

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

            filename: `${JS_DIR}/[name].[${env.prod?'chunkhash':'hash'}:8].js`
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
                    `${this.publicPath}${PUBLIC_FILE_NAME}`,

                    // 不用管理express依赖，DevServer已经依赖
                    require('express').static(PUBLIC_DIR)
                )
            },
            proxy: [
                {
                    context: ['/**'],
                    bypass: Mock(MOCK_API_JSON_FILE)
                }
            ]
        },
        resolve: {
            //  require时搜寻的路径, 可以直接require bower_components
            modules: [
                path.resolve(PROJECT_ROOT, "node_modules"),
                path.resolve(PROJECT_ROOT, "bower_components")
            ],

            //  可以利用别名来指向min.js，防止require三方依赖时，解析三方内部依赖！
            alias: {
                react$: path.resolve(PROJECT_ROOT, `node_modules/react/cjs/react.${env.prod ? 'production.min': 'development'}.js`),
                "react-dom$": path.resolve(PROJECT_ROOT, `node_modules/react-dom/cjs/react-dom.${env.prod ? 'production.min': 'development'}.js`),
                "react-router": path.resolve(PROJECT_ROOT, 'node_modules/react-router/umd/react-router.min.js'),
                "react-router-dom": path.resolve(PROJECT_ROOT, 'node_modules/react-router-dom/umd/react-router-dom.min.js')
            },
            extensions: ['.js', 'scss', 'css', 'less']
        },
        plugins:[

            //new WildcardsEntryWebpackPlugin(),
            new HtmlWebpackPlugin({
                filename: "index.html", //生成的html存放路径，相对于output.path
                template: `${SRC_DIR}/index.html`, // 相对cwd
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


            // names 顺序与html inject顺序相反
            new webpack.optimize.CommonsChunkPlugin({
                name: ["react"],
                minChunks: Infinity
            }),

            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: `"${ env.dev? 'development' : 'production'}"`,
                }
            })
        ],
        resolveLoader: {
            moduleExtensions: ["-loader"]
        },
        module: {
            rules: [
                {
                    test:  /^(?!.*?\.module).*\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test:  /\.module\.css$/,
                    use: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[path][name]__[local]--[hash:base64:5]']
                },

                {
                    test: /^(?!.*?\.module).*\.less/,
                    use: ['style-loader', 'css-loader', 'less-loader']
                },
                {
                    test:  /\.module\.less$/,
                    use: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[path][name]__[local]--[hash:base64:5]', 'less-loader']
                },

                {
                    test: /^(?!.*?\.module).*\.scss/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test:  /\.module\.scss$/,
                    use: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[path][name]__[local]--[hash:base64:5]', 'sass-loader']
                },

                {
                    test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: `file?name=${FONTS_DIR}/[name].[ext]`
                },
                {
                    test: /\.(png|jpe?g|gif)$/,
                    loader: `url?limit=1024&name=${IMGS_DIR}/[name].[ext]`
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    options: {
                        // presets 由 .babelrc 配置
                        //
                        plugins: (() => {
                            const arr = [
                                //  import() 本来webpack支持，但是用了babel需要插件才能支持了。
                                //  否则报语法错误
                                "syntax-dynamic-import",

                                //  babel-plugin-import
                                // import antd 模块的同时，加载css文件
                                ["import", {"libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
                            ]
                            if (env.prod) {
                                //异步加载 js chunk的同时，会异步拉取chunk 里的 css 文件
                                //https://medium.com/faceyspacey/webpacks-import-will-soon-fetch-js-css-here-s-how-you-do-it-today-4eb5b4929852
                                arr.push('dual-import')
                            }
                            return arr;
                        })()
                    }
                }
            ]
        }
    }


    if (env.dev) {
        const pluginList = [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
        ];
        Array.prototype.push.apply(config.plugins, pluginList);
    }

    // when prod
    if (env.prod) {

        // source map must be need, because we uglify js, min css etc
        config.devtool = 'source-map';

        config.module.rules[0].use = ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?minimize']
        })
        config.module.rules[1].use = ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?minimize&modules&importLoaders=1']
        })

        config.module.rules[2].use = ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?minimize', 'less-loader']
        })
        config.module.rules[3].use = ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?minimize&modules&importLoaders=1', 'less-loader']
        })

        config.module.rules[4].use = ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?minimize', 'sass-loader']
        })
        config.module.rules[5].use = ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?minimize&modules&importLoaders=1', 'sass-loader']
        })

        // prod plugins
        Array.prototype.push.apply(config.plugins, [

            // allowExternal must be true, or absolute path is as an out path of project,can not be removed
            new CleanWebpackPlugin([DIST_DIR], {allowExternal: true}),

            // copy PUBLIC_DIR to PUBLIC_DIST_DIR
            new CopyWebpackPlugin([
                    {
                        context: path.resolve(PUBLIC_DIR),
                        from: '**/*',
                        to: PUBLIC_DIST_DIR
                    }
                ],
                {copyunmodified: false}
            ),

            new ExtractTextPlugin({filename: `${CSS_DIR}/[name].[contenthash:8].css`}),

            // use in prod, commonsChunk vendor hash stable
            // output filename hash must be [chunkhash]
            new webpack.HashedModuleIdsPlugin(),

            // 根据路径作为稳定的模块名，便于调试，生产环境用 HashedModuleIdsPlugin 代替
            //new webpack.NamedModulesPlugin(),

            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                parallel: true,
                cache: true
            }),

            new FlushCssChunksWebpackPlugin({ entryOnly: true, entries: ['react'] }),

        ]);
    }

    // filterConfigProxy(customConfig, env);
    // return webpackMerge(customConfig, config);
    return  config;

}

function filterConfigProxy(config, env) {
    if(!config || !env.p) {
        return
    }

    let proxys = get(config, 'devServer.proxy')
    let pValue = get(env, 'p');

    if (isPlainObject(proxys) && pValue) {

        const proxyArr = [];
        const pKeys = Object.keys(proxys);
        const target = pValue.split('@')[1];
        if (target) {
            pValue = pValue.split('@')[0];
        }

        let index = -1;
        if(-1 !== (index = pKeys.indexOf(pValue))) {
            let proxyObj = proxys[pKeys[index]];

            if (target) {
                if (/^https?:\/\//.test(target)) {
                    proxyObj.target = target;
                }
                else {
                    proxyObj.target = `http://${target}`;
                }
            }
            proxyArr.push(proxyObj);
        }

        config.devServer.proxy = proxyArr;
    }
}
