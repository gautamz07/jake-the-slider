const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
// const autoprefixer = require('autoprefixer');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: "source-map",
  entry: {
    "bundle.js": "./docs/index.js"
  },
  output: {
    path: path.join(__dirname, "docs"),
    filename: "[name]"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
  ],
  /*
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  },
  */
};
