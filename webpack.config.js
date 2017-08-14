const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');


const definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
});

const TARGET = process.env.npm_lifecycle_event;

const common = {
    entry: {
        app: [
            // 'babel-polyfill',
            path.resolve(__dirname, 'js/index.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: 'bundle.js'
    },
    plugins: [
        definePlugin,
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    module: {
        rules: [
            {test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'js')}
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};

if (TARGET === 'build') {
    module.exports = merge(common, {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                drop_console: true,
                sourceMap: true,
                output: {
                    comments: false
                }
            }),
        ]
    });
} else {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        watch: true,
        output: {
            pathinfo: true,
        },
        plugins: [
            new BrowserSyncPlugin({
                host: process.env.IP || 'localhost',
                port: process.env.PORT || 3001,
                server: {baseDir: ['./']},
            })
        ]
    });
}
