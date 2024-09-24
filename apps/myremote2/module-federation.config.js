const { dependencies } = require('../../package.json');
module.exports = {
  name: 'myremote2',
  filename: 'remoteEntry.js',
  exposes: {
    './ModuleR2': './src/remote-entry.ts',
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: dependencies['react'],
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom'],
    },
  },
};
