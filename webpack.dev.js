const path = require("path");
const config = require("./webpack.config");
const { merge } = require("webpack-merge");
const HtmlWebPackPlugin = require("html-webpack-plugin");

let merged = merge(config, {
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        publicPath: "/",
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        publicPath: "/",
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "src/index.html",
            filename: "./index.html",
            favicon: "src/img/favicon.ico",
        }),
        new HtmlWebPackPlugin({
            template: "src/liminality.html",
            filename: "./liminality.html",
            favicon: "src/img/favicon.ico",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: [/node_modules/],
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
});

module.exports = merged;
