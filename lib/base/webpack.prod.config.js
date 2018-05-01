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
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CONFIG = require('../config.js');

module.exports = {
    output: {
        filename: `${CONFIG.JS_DIR}/[name].[chunkhash:8].js`
    },
    mode: 'development',

    // source map must be need, because we uglify js, min css etc
    devtool: 'source-map',


    plugins:[
        //new webpack.DefinePlugin({
            //'process.env': {
                //NODE_ENV: JSON.stringify('production'),
            //},
        //}),

        // allowExternal must be true, or absolute path is as an out path of project,can not be removed
        new CleanWebpackPlugin([CONFIG.DIST_DIR], {allowExternal: true}),

        // copy PUBLIC_DIR to PUBLIC_DIST_DIR
        //new CopyWebpackPlugin([{
                //context: path.resolve(CONFIG.PUBLIC_DIR),
                //from: '**/*',
                //to: CONFIG.PUBLIC_DIST_DIR
            //}],
            //{copyunmodified: false}
        //),

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: `${CONFIG.CSS_DIR}/[name].[contenthash:8].css`,
            chunkFilename: `${CONFIG.CSS_DIR}/[id].css`
        }),
    ],

    module: {
        rules: [
                {
                 test:  /^(?!.*?\.module).*\.css$/,
                 use: [MiniCssExtractPlugin.loader, 'css-loader?minimize']
                },
                {
                    test:  /\.module\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader?minimize&modules&importLoaders=1']
                },

                {
                    test: /^(?!.*?\.module).*\.less/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader?minimize', 'less-loader?javascriptEnabled=true']
                },
                {
                    test:  /\.module\.less$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader?minimize&modules&importLoaders=1', 'less-loader?javascriptEnabled=true']
                },

                {
                    test: /^(?!.*?\.module).*\.scss/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader?minimize', 'sass-loader']
                },
                {
                    test:  /\.module\.scss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader?minimize&modules&importLoaders=1', 'sass-loader']
                },
        ]
    },
}
