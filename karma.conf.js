const path = require('path');

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      { pattern: 'src/**/*.spec.jsx', watched: false }
    ],
    preprocessors: {
      'src/**/*.spec.jsx': ['webpack', 'sourcemap']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: { esmodules: true } }],
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ]
              }
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
          '@': path.resolve(__dirname, 'src')
        }
      },
      devtool: 'inline-source-map'
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};
