var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        index: './scripts/VelocityTransitionGroup.jsx'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: 'dist/',
        filename: 'VelocityTransitionGroup.min.js',
        library: 'VelocityTransitionGroup',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            { test: /\.(js|jsx)/, loader: 'babel' }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: {
                except: ['React', 'Velocity', 'VelocityTransitionGroup']
            }
        }),
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    externals: {
        'react/addons': 'React',
        'velocity-animate': 'Velocity',
        'velocity-animate/velocity.ui': 'velocity-animate/velocity.ui'
    },
};