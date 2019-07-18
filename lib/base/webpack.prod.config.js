const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CONFIG = require('../config.js');
const moduleCssLoader = 'css-loader?modules&importLoaders=1&localIdentName=[hash:base64:8]';

module.exports = {
    output: {
        filename: `${CONFIG.JS_DIR}/[name].[chunkhash:8].js`,
        publicPath: CONFIG.OUTPUT_PUBLIC_PATH
    },
    mode: 'production',

    optimization: {
        minimizer: [
            // safary10  bug，不然可以不用显示申明uglify
            //https://hughfenghen.github.io/fe/bug1-safari10.html#%E7%AC%AC%E4%B8%89%E5%9B%9E%E5%90%88
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    safari10: true,
                }
            }),
        ],
    },

    // source map must be need, because we uglify js, min css etc
    devtool: 'source-map',

    stats: {
        // CopyWebpackPlugin 时， 日志输出太多，关闭它
        excludeAssets: new RegExp(`^${CONFIG.PUBLIC_FILE_NAME}`),
    },
    plugins:[
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

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: `${CONFIG.CSS_DIR}/[name].[contenthash:8].css`,
            chunkFilename: `${CONFIG.CSS_DIR}/[id].[contenthash:8].css`,
        }),
    ],

    module: {
        rules: [
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: `file?publicPath=${CONFIG.FONTS_PUBLIC_PATH}&name=${CONFIG.FONTS_DIR}/[name].[hash8].[ext]`
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: `url?publicPath=${CONFIG.IMGS_PUBLIC_PATH}&limit=1024&name=${CONFIG.IMGS_DIR}/[name].[hash:8].[ext]`
            },
            {
                test:  /^(?!.*?\.module).*\.css$/,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: CONFIG.EXTRACT_RESOURCE_IN_CSS_PUBLIC_PATH,
                    },
                },
                'css-loader']
            },
            {
                test:  /\.module\.css$/,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: CONFIG.EXTRACT_RESOURCE_IN_CSS_PUBLIC_PATH,
                    },
                },
                moduleCssLoader]
            },

            {
                test: /^(?!.*?\.module).*\.less/,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: CONFIG.EXTRACT_RESOURCE_IN_CSS_PUBLIC_PATH,
                    },
                },
                'css-loader', 'less-loader?javascriptEnabled=true']
            },
            {
                test:  /\.module\.less$/,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: CONFIG.EXTRACT_RESOURCE_IN_CSS_PUBLIC_PATH,
                    },
                },
                moduleCssLoader, 'less-loader?javascriptEnabled=true']
            },

            {
                test: /^(?!.*?\.module).*\.scss/,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: CONFIG.EXTRACT_RESOURCE_IN_CSS_PUBLIC_PATH,
                    },
                },
                'css-loader', 'sass-loader']
            },
            {
                test:  /\.module\.scss$/,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: CONFIG.EXTRACT_RESOURCE_IN_CSS_PUBLIC_PATH,
                    },
                },
                moduleCssLoader, 'sass-loader']
            },
        ]
    },
}
