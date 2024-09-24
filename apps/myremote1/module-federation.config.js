const { dependencies } = require('../../package.json');
module.exports = {
  name: 'myremote1',
  filename: 'remoteEntry.js',
  exposes: {
    './ModuleR1': './src/remote-entry.ts',
    './ButtonR1': './src/components/R1Button.tsx',
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
