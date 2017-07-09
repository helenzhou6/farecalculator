module.exports = {
    entry: ['whatwg-fetch', './src/js/app.js'],
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
