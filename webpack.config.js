// const path = require('path')

module.exports = {
    entry: {
        main: "./src/js/main.js",
        vendor: "./src/js/vendor.js",
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                            attributes: {
                                list: [
                                    "...",
                                    {
                                        tag: "meta",
                                        attribute: "content",
                                        type: "src",
                                        /**
                                         * @docs https://github.com/webpack-contrib/html-loader#list
                                         */
                                        filter: (
                                            _tag,
                                            _attribute,
                                            attributes,
                                            _resourcePath
                                        ) => {
                                            if (
                                                attributes.property ===
                                                    "og:image" ||
                                                attributes.name ===
                                                    "twitter:image"
                                            ) {
                                                return true;
                                            }
                                            return false;
                                        },
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/, /vendor/],
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[hash].[ext]",
                            esModule: false,
                        },
                    },
                ],
            },
            {
                test: /\.svg$/i,
                use: [
                    {
                        loader: "url-loader",
                    },
                ],
            },
        ],
    },
};
