var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react-with-addons.min.js');

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
            { test: /\.(js|jsx)/, loader: 'babel' },
        ],
        noParse: [pathToReact]
    },
    resolve: {
        alias: {
          'react/addons': pathToReact
        },
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        contentBase: './example',
    }
};