const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CONFIG = require('../config.js');
const moduleCssLoader = 'css-loader?modules&importLoaders=1&localIdentName=[hash:base64:8]';

module.exports = {
    output: {
        filename: `${CONFIG.JS_DIR}/[name].[chunkhash:8].js`,
        publicPath: CONFIG.OUTPUT_PUBLIC_PATH
    },
    mode: 'production',

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
                use: [MiniCssExtractPlugin.loader, 'css-loader?minimize']
            },
            {
                test:  /\.module\.css$/,
                use: [MiniCssExtractPlugin.loader, moduleCssLoader]
            },

            {
                test: /^(?!.*?\.module).*\.less/,
                use: [MiniCssExtractPlugin.loader, 'css-loader?minimize', 'less-loader?javascriptEnabled=true']
            },
            {
                test:  /\.module\.less$/,
                use: [MiniCssExtractPlugin.loader, moduleCssLoader, 'less-loader?javascriptEnabled=true']
            },

            {
                test: /^(?!.*?\.module).*\.scss/,
                use: [MiniCssExtractPlugin.loader, 'css-loader?minimize', 'sass-loader']
            },
            {
                test:  /\.module\.scss$/,
                use: [MiniCssExtractPlugin.loader, moduleCssLoader, 'sass-loader']
            },
        ]
    },
}
