module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /bower_components|node_modules\/(?!(swiper)\/).*/,
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-react"],
                    plugins: [
                        // add plugins from base
                        "react-hot-loader/babel",
                    ]
                }
            }
        ]
    }
}
