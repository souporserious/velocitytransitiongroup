module.exports = {
    entry: {
        index: ['webpack/hot/dev-server', './scripts/index.jsx']
    },
    output: {
        path: './example',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.jsx/, loader: 'jsx-loader?harmony' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};