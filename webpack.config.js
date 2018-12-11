const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        bundle: './index.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'bundle'),
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: require.resolve('awesome-typescript-loader'),
                options: {
                    useBabel: true,
                    useCache: true,
                    babelCore: '@babel/core',
                    reportFiles: [
                        'src/**/*.{ts,tsx}',
                    ],
                },
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                options: {
                    configFile: path.resolve(__dirname, 'babel.config.js'),
                },
                exclude: /(node_modules)/
            },
        ],
    },
    resolve: {
        extensions: [ '.ts', '.js', '.json'],
    },
    target: 'node'
};
