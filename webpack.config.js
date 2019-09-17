const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
       app: './client/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            // jsx files
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            // CSS
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            //SASS
            {
                test: /\.sass$/,
                use: ['style-loader', 'sass-loader']
            },
            // config for images
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader'
                    }
                ]
            },
            // Typescript config
            {
                test: /\.ts$/,
                use: 'ts-loader '
            }
        ]
    },
    devServer: {
        publicPath: '/build',
        proxy: {
            '/*': 'http://localhost:3000'
        },
        hot: true,
        host: 'localhost'
    },
    // plugins
    plugins: [],
    watch: true
}
