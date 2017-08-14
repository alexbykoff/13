const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
});

const TARGET = process.env.npm_lifecycle_event;

const common = {
    entry: {
        app: [
            // 'babel-polyfill',
            path.resolve(__dirname, 'js/index.js'),
            path.resolve(__dirname, 'styles/styles.css')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',
        filename: 'bundle.js'
    },
    plugins: [
        definePlugin,
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new ExtractTextPlugin({
            filename: 'styles.min.css'
        }),
        new HtmlWebpackPlugin({
          template: 'index.html',
          minify: {
            collapseWhitespace: true,
            preserveLineBreaks: false
          }
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/, use: ['babel-loader?presets[]=es2015'],
                include: path.join(__dirname, 'js')
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader'],
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
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
                server: {baseDir: ['./dist']},
            })
        ]
    });
}
