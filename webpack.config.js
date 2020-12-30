const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");


const front = {
    entry: './src/front/index.tsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist/front'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            filename: "index.html",
            template: 'src/templates/index.pug'
        })
    ],
    module: {
        rules: [{
            test: /\.pug$/,
            loader: "pug-loader"
        }, {
            test: /\.(js|mjs|ts|tsx|jsx)?$/,
            exclude: /(node_modules|bower_components)/,
            loader: "babel-loader"
        }]
    }
};

const back = {
    entry: './src/back/index.ts',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist/back/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(js|mjs|ts|tsx|jsx)?$/,
            exclude: /(node_modules|bower_components)/,
            loader: "babel-loader"
        }]
    }
};

module.exports = [back, front];