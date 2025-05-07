// craco.config.js
module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.module.rules.push({
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
                exclude: [/node_modules\/lucide-react/],
            });
            return webpackConfig;
        },
    },
};
