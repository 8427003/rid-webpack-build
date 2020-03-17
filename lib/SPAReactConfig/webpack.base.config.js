const babelOptions = require('./babel.options.js');

module.exports = {
    module: {
        rules: [
            {
                // webpack.smart 会覆盖整个rule item
                test: /\.js$/,
                exclude: /bower_components|node_modules\/(?!(swiper)\/).*/,
                loader: 'babel-loader',
                // webpack.smart 不会合并options
                options: {
                    ...babelOptions
                }
            }
        ]
    }
}
