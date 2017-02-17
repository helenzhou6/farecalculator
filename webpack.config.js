module.exports = {
    entry: './src/js/app.js',
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    },
    output: {
        filename: './dist/js/app.js'
    }
}
