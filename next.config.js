/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
    webpack: (config) => {
        config.plugins = config.plugins || [];

        config.optimization.providedExports = true;

        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, './')
        };

        return config;
    }
};

const nextConfig = {
    compiler: {
        styledComponents: true
    },
    reactStrictMode: false
};

module.exports = nextConfig;
