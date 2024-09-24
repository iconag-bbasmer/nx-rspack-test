const { composePlugins, withNx, withReact } = require('@nx/rspack');
const {
  ModuleFederationPlugin,
} = require('@module-federation/enhanced/rspack');
const mfConfig = require('./module-federation.config');
const path = require('path');

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
  exclude: '/node_modules/',
};

const cssConfig = {
  test: /\.css$/,
  use: [
    {
      loader: 'css-loader',
    },
  ],
  type: 'css/auto',
  exclude: '/node_modules/',
};

module.exports = composePlugins(withNx(), withReact(), (config, context) => {
  config.context = path.join(context.context.root, 'apps/myremote2'); // Path to app
  config.plugins.push(new ModuleFederationPlugin({ ...mfConfig, dts: false }));
  config.output.publicPath = 'auto'; // '/' for host, 'auto' for remotes
  config.devServer = {
    ...config.devServer,
    port: 4202, // Make sure port fits to application
  };
  //  Resolve the paths in tsconfig
  config.resolve = {
    ...config.resolve,
    tsConfig: {
      configFile: path.resolve(
        context.context.root,
        'apps/myremote2/tsconfig.app.json'
      ),
      references: 'auto',
    },
  };
  //  CSS / SCSS setup
  config.experiments = { css: true };
  config.module = {
    ...config.module,
    rules: [...config.module.rules, cssConfig, sassConfig],
    parser: {
      ...config.module.parser,
      'css/auto': {
        namedExports: false,
      },
    },
    //  Make sure naming css classes of scss modules is working
    generator: {
      ...config.module.generator,
      'css/auto': {
        localIdentName: '[local]-[id]',
        exportsConvention: 'camel-case',
      },
    },
  };
  return config;
});
