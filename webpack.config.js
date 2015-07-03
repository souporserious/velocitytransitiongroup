var path = require('path');
var nodeModulesDir = path.resolve(__dirname, 'node_modules');

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
            { test: /\.(jsx)/, exclude: /node_modules/, loader: 'babel' },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        contentBase: './example',
    }
};