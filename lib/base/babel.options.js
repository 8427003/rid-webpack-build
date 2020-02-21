// 特殊地，因为webpack.smart 只能处理到module.rules.[item] 级的合并
// item options是处理不了的，我们自行合并
//
// options的value最好放到 .babelrc 配置管理
// 以便测试环境能复用
module.exports = {
    presets: ["@babel/preset-env"],

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
    ]
}
