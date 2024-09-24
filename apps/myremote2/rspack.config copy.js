const { composePlugins, withNx, withReact } = require('@nx/rspack');
const {
  ModuleFederationPlugin,
} = require('@module-federation/enhanced/rspack');
const mfConfig = require('./module-federation.config');
const path = require('path');

module.exports = composePlugins(withNx(), withReact(), (config, context) => {
  config.context = path.join(context.context.root, 'apps/myremote2');
  config.plugins.push(new ModuleFederationPlugin({ ...mfConfig, dts: false }));
  config.output.publicPath = 'auto';
  config.devServer = {
    ...config.devServer,
    port: 4202,
  };
  return config;
});

// const { composePlugins, withNx, withReact } = require('@nx/rspack');
// const {
//   ModuleFederationPlugin,
// } = require('@module-federation/enhanced/rspack');
// const mfConfig = require('./module-federation.config');
// const path = require('path');
// const rspack = require('@rspack/core');

// const envVariables = {};

// for (let key in process.env) {
//   envVariables[`process.env.${key}`] = JSON.stringify(process.env[key]);
// }

// module.exports = composePlugins(withNx(), withReact(), (baseConfig) => {
//   const config = {
//     ...baseConfig,
//     output: {
//       publicPath: 'auto',
//       filename: '[name].[contenthash].js',
//     },
//     devServer: {
//       ...baseConfig.devServer,
//       historyApiFallback: true,
//       port: 4202,
//       hot: false,
//     },
//     resolve: {
//       alias: {
//         src: path.resolve(__dirname, './src'),
//       },
//       extensions: ['.js', '.ts', '.tsx'],
//     },
//     module: {
//       rules: [
//         ...baseConfig.module.rules,
//         {
//           test: /\.(png|jpe?g|gif|svg)$/i,
//           type: 'asset/resource',
//         },
//         {
//           test: /\.css$/,
//           type: 'css',
//           exclude: '/node_modules/',
//         },
//       ],
//     },
//     plugins: [
//       ...baseConfig.plugins,
//       new ModuleFederationPlugin({ ...mfConfig }),
//       new rspack.ProvidePlugin({
//         process: [require.resolve('process/browser')],
//       }),
//       new rspack.DefinePlugin(envVariables),
//     ],
//   };
//   return config;
// });
