const path = require("path");

module.exports = async ({ config }) => {
    config.module.rules.unshift({
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "../src/examples"),
        loaders: [
            {
                loader: require.resolve("@storybook/addon-storysource/loader"),
                options: {
                    prettierConfig: {
                        tabWidth: 4,
                        trailingComma: "es5",
                    },
                },
            },
        ],
        enforce: "pre",
    });

    return config;
};
