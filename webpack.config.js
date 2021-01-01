const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');


const front = {
    entry: './src/front/index.tsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist/front'),
        filename: 'index.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            // You can add comment "Please do not delete this file" in this file
            modernizr$: path.resolve(__dirname, "empty-alias-file.js")
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            cache: true,
            hash: true,
            filename: "index.html",
            template: 'src/templates/index.pug'
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/public', to: './' },
            ],
        }),
    ],
    module: {
        rules: [{
            test: /\.pug$/,
            loader: "pug-loader"
        }, {
            test: /\.(js|mjs|ts|tsx|jsx)?$/,
            exclude: /(node_modules|bower_components)/,
            loader: "babel-loader"
        }, {
            loader: "webpack-modernizr-loader",
            options: {
                // Full list of supported options can be found in [config-all.json](https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json).
                options: ["setClasses"],
                "feature-detects": [
                    "test/css/flexbox",
                    "test/es6/promises",
                    "test/serviceworker"
                ]
                // Uncomment this when you use `JSON` format for configuration
                // type: 'javascript/auto'
            },
            test: /empty-alias-file\.js$/
        }]
    }
};

const back = {
    entry: './src/back/index.ts',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist/back/'),
        filename: 'server.js'
    },
    target: 'node',
    resolve: { extensions: [".ts", ".js", ".json"] },
    module: {
        rules: [{
            test: /\.(js|mjs|ts)?$/,
            exclude: /(node_modules|bower_components)/,
            loader: "babel-loader"
        }]
    }
};

module.exports = [back, front];
// module.exports = back;
// module.exports = front;