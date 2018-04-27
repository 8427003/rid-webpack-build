/**
 *
 * css spilting code require 3 modules:
 * extract-css-chunks-webpack-plugin
 * flush-css-chunks-webpack-plugin
 * babel-plugin-dual-import
 *
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-css-chunks-webpack-plugin");
const FlushCssChunksWebpackPlugin = require('flush-css-chunks-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CONFIG = require('../config.js');

module.exports = {
    output: {
        filename: `${CONFIG.JS_DIR}/[name].[chunkhash:8].js`
    },

    // source map must be need, because we uglify js, min css etc
    devtool: 'source-map',


    plugins:[
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),

        // allowExternal must be true, or absolute path is as an out path of project,can not be removed
        new CleanWebpackPlugin([CONFIG.DIST_DIR], {allowExternal: true}),

        // copy PUBLIC_DIR to PUBLIC_DIST_DIR
        new CopyWebpackPlugin([{
                context: path.resolve(CONFIG.PUBLIC_DIR),
                from: '**/*',
                to: CONFIG.PUBLIC_DIST_DIR
            }],
            {copyunmodified: false}
        ),

        new ExtractTextPlugin({filename: `${CONFIG.CSS_DIR}/[name].[contenthash:8].css`}),

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

        //  webpack-flush-chunks work with babel plugin: dual-import
        new FlushCssChunksWebpackPlugin({ entryOnly: true, entries: ['index'] }),
    ],

    module: {
        rules: [
            ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?minimize']
            }),
            ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?minimize&modules&importLoaders=1']
            }),
            ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?minimize', 'less-loader']
            }),
            ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?minimize&modules&importLoaders=1', 'less-loader']
            }),
            ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?minimize', 'sass-loader']
            }),
            ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?minimize&modules&importLoaders=1', 'sass-loader']
            }),
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

                        //异步加载 js chunk的同时，会异步拉取chunk 里的 css 文件
                        //https://medium.com/faceyspacey/webpacks-import-will-soon-fetch-js-css-here-s-how-you-do-it-today-4eb5b4929852
                        'dual-import'
                    ]
                }
            }
        ]
    },
}
