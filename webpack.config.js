const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode:'development',
    devtool:'cheap-module-source-map',
    entry:{
        index:'./src/main.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'assets/js/[name].js'
    },
    plugins:[
        new ExtractTextPlugin('assets/css/[name].css'),
        new HtmlPlugin({
            template:'./public/index.html',
            filename:'./index.html',
            thunks:['index']
        })
    ],
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-react'],
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            ["import", {libraryName: "antd", style: 'css'} ]
                        ],
                    },
                }
            },
            {
                test:/\.less$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','less-loader']
                })
            },
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader']
                })
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:'url-loader?name=[path][name].[ext]'
            }
        ]
    }
}