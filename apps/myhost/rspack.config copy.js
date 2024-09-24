const { composePlugins, withNx, withReact, withWeb } = require('@nx/rspack');
const {
  ModuleFederationPlugin,
} = require('@module-federation/enhanced/rspack');
const mfConfig = require('./module-federation.config');
const path = require('path');
const rspack = require('@rspack/core');

const envVariables = {};

for (let key in process.env) {
  envVariables[`process.env.${key}`] = JSON.stringify(process.env[key]);
}

const sassConfig = {
  test: /\.scss$|\.sass$/,
  use: [
    {
      loader: 'sass-loader',
      options: {
        // using `modern-compiler` and `sass-embedded` together significantly improve build performance,
        // requires `sass-loader >= 14.2.1`
        api: 'modern-compiler',
        implementation: require.resolve('sass-embedded'),
      },
    },
  ],
  // set to 'css/auto' if you want to support '*.module.(scss|sass)' as CSS Modules, otherwise set type to 'css'
  type: 'css/auto',
};

module.exports = composePlugins(
  withNx(),
  withReact(),
  withWeb(),
  (baseConfig) => {
    const config = {
      ...baseConfig,
      experiments: { css: true },
      output: {
        publicPath: '/',
        filename: '[name].[contenthash].js',
      },
      devServer: {
        ...baseConfig.devServer,
        historyApiFallback: true,
        port: 4200,
        hot: false,
      },
      resolve: {
        alias: {
          src: path.resolve(__dirname, './src'),
        },
        extensions: ['.js', '.ts', '.tsx'],
      },
      module: {
        rules: [
          ...baseConfig.module.rules,
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.css$/,
            type: 'css/auto',
            exclude: '/node_modules/',
          },
          sassConfig,
        ],
        parser: {
          ...baseConfig.module.parser,
          'css/auto': {
            namedExports: false,
          },
        },
        generator: {
          ...baseConfig.module.generator,
          'css/auto': {
            localIdentName: '[local]-[id]',
            exportsConvention: 'camel-case',
          },
        },
      },
      plugins: [
        ...baseConfig.plugins,
        new ModuleFederationPlugin({ ...mfConfig }),
        new rspack.ProvidePlugin({
          process: [require.resolve('process/browser')],
        }),
        new rspack.DefinePlugin(envVariables),
      ],
    };
    return config;
  }
);
