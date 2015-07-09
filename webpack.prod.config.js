var path = require('path');
var webpack = require('webpack');
var TARGET = process.env.TARGET || null;

var config = {
    entry: {
        index: './scripts/VelocityTransitionGroup.jsx'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: 'dist/',
        filename: 'VelocityTransitionGroup.js',
        sourceMapFilename: 'VelocityTransitionGroup.map',
        library: 'VelocityTransitionGroup',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            { test: /\.(js|jsx)/, loader: 'babel?stage=0' }
        ]
    },
    plugins: [],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    externals: {
        'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'velocity-animate': {
            root: 'Velocity',
            commonjs2: 'velocity-animate',
            commonjs: 'velocity-animate',
            amd: 'velocity-animate'
        }
    },
};

if(TARGET === 'minify') {
    config.output.filename = 'VelocityTransitionGroup.min.js';
    config.output.sourceMapFilename = 'VelocityTransitionGroup.min.map';
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        mangle: {
            except: ['React', 'Velocity', 'VelocityTransitionGroup']
        }
    }));
}

module.exports = config;