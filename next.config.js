const path = require('path');

module.exports = {
  swcMinify: true,
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    config.resolve.modules.push(path.resolve('./'));
    config.experiments = {};
    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {},
      },
    ],
  },
};
