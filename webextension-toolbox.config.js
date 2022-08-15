const { launchEditorMiddleware } = require('react-dev-inspector/plugins/webpack');
const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');
const themeVars = path.join(
  __dirname,
  'app/front/style/antd-theme-overrides.less',
);
const nodeModulesDir = path.join(__dirname, 'node_modules');
const themeVariables = lessToJs(fs.readFileSync(themeVars, 'utf8'));
const { DefinePlugin } = require('webpack');

require('dotenv').config();

module.exports = {
  webpack: (
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    (config) => {
    configNew = Object.assign(config, 
      {
        mode: process.env.NODE_ENV || 'development',
        entry: {
          options: path.join(__dirname, 'app', 'pages', 'options.html'),
          popup: path.join(__dirname, 'app', 'pages', 'popup.jsx'),
          background: path.join(__dirname, 'app', 'scripts', 'background.js'),
          contentScript: path.join(__dirname, 'app', 'scripts', 'contentscript.js'),
        },
        resolve: {
          fallback: {
            path: require.resolve("path-browserify")
          },
          modules: ['app/front', 'node_modules'],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
          alias: {
            '~': path.resolve(__dirname, './app'),
          }
        },
        module: {
          rules: [
            {
              test: /\.jsx$/,
              enforce: 'pre',
              exclude: [nodeModulesDir],
              loader: 'babel-loader',
              options: { 
                presets: ['@babel/env','@babel/preset-react'],
                plugins: [
                  ['import', { libraryName: "antd", style: true }]
                ],
              },
            },
            {
              test: /\.js$/,
              enforce: 'pre',
              exclude: [nodeModulesDir],
              loader: 'babel-loader',
              options: {
                plugins: [
                  ['import', { libraryName: "antd", style: true }]
                ],
              },
            },
            { test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: [nodeModulesDir] },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
            },
            {
              test: /\.less$/,
              use: [
                'style-loader',
                { loader: 'css-loader', options: { importLoaders: 1 } },
                {
                  loader: 'less-loader',
                  options: { javascriptEnabled: true, modifyVars: themeVariables }
                },
              ],
            },
            {
              test: /\.html$/,
              loader: 'html-loader',
              exclude: /node_modules/,
            },
            {
              test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 100000,
                    name: '[name].[ext]',
                  },
                },
              ],
            },
          ]
        },
        plugins: [
          new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
            'process.env.PWD': JSON.stringify(process.env.PWD),
            'process.env.REACT_EDITOR': JSON.stringify(process.env.REACT_EDITOR),
            'process.env.FWORK_URL': JSON.stringify(process.env.FWORK_URL),
            'process.env.DEVELOP_USER_TOKEN': JSON.stringify(process.env.DEVELOP_USER_TOKEN),
            'process.env.FWORK_PROJECT_ID': JSON.stringify(process.env.FWORK_PROJECT_ID),
          }),
          new CopyWebpackPlugin({
            patterns: [
              {
                from: 'images/icon-16.png',
                to: path.join(__dirname, 'dist/chrome/images'),
                force: true,
              },
            ],
          }),
          new CopyWebpackPlugin({
            patterns: [
              {
                from: 'images/icon-19.png',
                to: path.join(__dirname, 'dist/chrome/images'),
                force: true,
              },
            ],
          }),
          new CopyWebpackPlugin({
            patterns: [
              {
                from: 'images/icon-38.png',
                to: path.join(__dirname, 'dist/chrome/images'),
                force: true,
              },
            ],
          }),
          new CopyWebpackPlugin({
            patterns: [
              {
                from: 'images/icon-128.png',
                to: path.join(__dirname, 'dist/chrome/images'),
                force: true,
              },
            ],
          }),
          new CopyWebpackPlugin({
            patterns: [
              {
                from: 'images/logo_4.png',
                to: path.join(__dirname, 'dist/chrome/images'),
                force: true,
              },
            ],
          }),
          new CopyWebpackPlugin({
            patterns: [
              {
                from: 'images/logo_3.svg',
                to: path.join(__dirname, 'dist/chrome/images'),
                force: true,
              },
            ],
          }),
          new CopyWebpackPlugin({
            patterns: [
              {
                from: 'styles/contentscript.css',
                to: path.resolve(__dirname, 'dist/chrome/contentScript.css'),
                force: true,
              },
            ],
          }),
          new CopyWebpackPlugin({
            patterns: [
              {
                from: 'manifest.json',
                to: path.resolve(__dirname, 'dist/chrome/manifest.json'),
                force: true,
                transform: function (content, path) {
                  // generates the manifest file using the package.json informations
                  return Buffer.from(
                    JSON.stringify({
                      description: process.env.npm_package_description,
                      version: process.env.npm_package_version,
                      ...JSON.parse(content.toString()),
                    })
                  );
                },
              },
            ],
          }),
          new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app', 'pages', 'popup.html'),
            filename: 'popup.html',
            chunks: ['popup'],
            cache: false,
          }),
          new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app', 'pages', 'options.html'),
            filename: 'options.html',
            chunks: ['options'],
            cache: false,
          })
        ],
        devServer: {
          before: (app) => {
            app.use(launchEditorMiddleware)
          }
        } 
      }
    )
    //console.log(configNew)
    return configNew
  })
}
