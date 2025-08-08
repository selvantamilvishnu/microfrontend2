const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: "auto",
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'development',
  devServer: {
    port: 5001,
    historyApiFallback: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Home': './src/components/Home.jsx',
        './Dashboard': './src/components/Dashboard.jsx',
        './ContactUs': './src/components/ContactUs.jsx',
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: '19.1.1',
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: '19.1.1',
        },
      },
    }),
  ],
};
