const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CONFIG = require('../config.js');

module.exports = {
    target: 'electron-renderer',
    plugins:[
        new HtmlWebpackPlugin({
            filename: "index.html", //生成的html存放路径，相对于output.path
            template: `${CONFIG.SRC_DIR}/index.html`, // 相对cwd
        }),
    ],
    resolve: {
        //  可以利用别名来指向min.js，防止require三方依赖时，解析三方内部依赖！
        alias: {
            react$: path.resolve(CONFIG.PROJECT_ROOT, 'node_modules/react/cjs/react.production.min.js'),
            "react-dom$": path.resolve(CONFIG.PROJECT_ROOT, 'node_modules/react-dom/cjs/react-dom.production.min.js'),
        },
    }
}
