import path from 'path';
import webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import pkg from './package.json';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({
    path: path.join(__dirname, '../.env'),
});

const IS_DEBUG = process.env.MODUS_DEBUG === 'true';
const IS_DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') >= 0;

// Plugins that are used for all environments.
const plugins = [
    new webpack.ProvidePlugin({
        React: 'react',
    }),
    // Main static file.
    new HtmlWebPackPlugin({
        inject: false,
        template: 'src/index.html',
        // Relative to `output.publicPath`.
        filename: '../index.html',
        title: IS_DEBUG ? 'Modus – DEV' : 'Modus – Just Track',
        isDevServer: IS_DEV_SERVER,
    }),
    new webpack.DefinePlugin({
        MODUS_CONFIG: JSON.stringify({
            apiUrl: process.env.MODUS_API_URL,
        }),
    }),
];

if (!IS_DEBUG) {
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        // UglifyJs produces nonsense warnings by default.
        compress: { warnings: false },
    }));
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
}

module.exports = {
    context: __dirname,
    entry: {
        bundle: 'boot.js',
    },
    devtool: IS_DEBUG ? '#eval' : null,
    debug: IS_DEBUG,
    output: {
        filename: `[name]-${IS_DEV_SERVER ? 'dev' : '[hash:7]'}.js`,
        chunkFilename: `[name]-[id]-${IS_DEV_SERVER ? 'dev' : '[chunkhash:7]'}.js`,
        path: path.join(__dirname, 'dist/static'),
        publicPath: 'static/',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
            }, {
                // Extract all non-CSS and non-JS assets.
                test: /\.(gif|png|jpe?g|svg|ico|woff|ttf|mp3)$/i,
                loader: 'file',
                query: {
                    name: `[name]-${IS_DEV_SERVER ? 'dev' : '[hash:7]'}.[ext]`,
                },
            }, {
                test: /\.css$/,
                loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            },
        ],
    },
    plugins,
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    resolve: {
        root: path.join(__dirname, 'src'),
        extensions: ['', '.js'],
        alias: {},
    },
    devServer: {
        stats: 'errors-only',
        historyApiFallback: true,
    },
};
