const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const config = {
    entry: "./src/lib.js",
    output: {
        path: path.resolve(__dirname, "lib"),
        filename: "TolkienCalendars.js",
        publicPath: ".",
        library: "TolkienCalendars",
        libraryTarget: "umd",
    },
    // Stop compilation early in production
    bail: true,
    devtool: "source-map",
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: "head",
            scriptLoading: "blocking",
            template: "public/lib.html",
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            filename: "TolkienCalendars.css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                        },
                    },
                    "postcss-loader",
                ],
            },
            {
                test: /\.ts(x)?$/,
                loader: "ts-loader",
                options: { configFile: "tsconfig.lib.json" },
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    externals: {
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "react",
            root: "React", // indicates global variable
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "react-dom",
            root: "ReactDOM", // indicates global variable
        },
    },
};

module.exports = config;
