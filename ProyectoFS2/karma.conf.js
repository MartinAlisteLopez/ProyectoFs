// Karma configuration
// Generated on Sun Oct 26 2025 22:38:00 GMT-0300 (hora de verano de Chile)

const path = require('path');
// Usar Chromium embebido por puppeteer en entornos donde no hay Chrome instalado
try {
  process.env.CHROME_BIN = require('puppeteer').executablePath();
} catch (e) {
  // si falla, dejar que Karma intente usar Chrome del sistema
}

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      // util / módulos que deben cargarse antes de los tests
      'src/sample.js',
      // tests
      'src/**/*.spec.js',
      'src/**/*.spec.jsx',
      'src/**/*.test.js'
    ],
    exclude: [],
    preprocessors: {
      'src/sample.js': ['webpack'],
      'src/**/*.spec.js': ['webpack'],
      'src/**/*.spec.jsx': ['webpack'],
      'src/**/*.test.js': ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          { test: /\.(js|jsx)$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
          { test: /\.css$/, use: ['style-loader','css-loader'] }
        ]
      },
      resolve: { extensions: ['.js', '.jsx'] }
    },
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'Chrome Headless 142.0.0.0 (Windows 10)' },
        { type: 'lcovonly', subdir: '.', file: 'lcov.info' },
        { type: 'text-summary' }
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless', 'ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    },
    singleRun: true,
    concurrency: Infinity
  });
};
