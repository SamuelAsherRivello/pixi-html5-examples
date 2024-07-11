const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets', to: 'assets' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ];

  // Add BundleAnalyzerPlugin only if `analyze` flag is set
  if (env && env.analyze) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return {
    entry: {
      main: './src/scripts/index.ts',
      styles: './src/css/styles.css',
    },
    output: {
      filename: '[name].[contenthash].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      chunkFilename: '[name].[contenthash].bundle.js',
    },
    devtool: 'source-map', // Enable source maps
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@src': path.resolve(__dirname, 'src')
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    plugins: plugins,
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    performance: {
      hints: false, // Disable performance hints
    },
    devServer: {
      port: 3000, // Change the port here
      static: {
        directory: path.resolve(__dirname, 'dist'), // Ensure it serves files from the correct directory
      },
      hot: false, // Turn off hot reload
      client: {
        logging: 'error', // Suppress most Webpack Dev Server messages, show only errors
      },
      setupMiddlewares: (middlewares, devServer) => {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }

        devServer.middleware.waitUntilValid(() => {
          console.log(`
//- - - - - - - - - - - - - - - - - - - - - - - - - - - 
// Success! Play Via Browser:  http://localhost:${devServer.options.port}/ 
//- - - - - - - - - - - - - - - - - - - - - - - - - - -
          `);
        });

        return middlewares;
      },
    },
    stats: {
      all: false, // Disable all logging
      errors: true, // Show errors
      warnings: true, // Show warnings
      timings: false, // Show build timings
      entrypoints: false, // Show entry points
      assets: false, // Show assets
    },
  };
};
