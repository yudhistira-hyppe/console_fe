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
