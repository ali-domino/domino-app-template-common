/* eslint strict:0 */
'use strict';

const path = require('path');
const fs = require('fs-extra');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pageNames = fs.readdirSync('./src');
const entry = {};
const htmlPlugins = [];
pageNames.forEach(pageName => {
  if (!fs.statSync('./src/' + pageName).isDirectory()) return;
  fs.writeFileSync(`./src/${pageName}.jsx`, `import React from 'react';
import ReactDom from 'react-dom';
import Page from "@alipay/domino-compiler/loader/!./${pageName}/index";

ReactDom.render(<Page />, document.querySelector('#content'));
`);
  const pageJSON = fs.readJSONSync(`./src/${pageName}/index.json`);
  entry[pageName] = path.join(__dirname, `./src/${pageName}.jsx`);
  htmlPlugins.push(new HtmlWebpackPlugin({
    template: 'template.html',
    filename: pageName + '.html', // 生成的html页面的名字为one.html
    title: pageJSON.defaultTitle || '',
    // hash: true,
    chunks: [pageName],
  }));
});
if (htmlPlugins.length === 0) throw new Error('请将页面目录放入 ./src 下');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: '#source-map',
  devServer: {
    disableHostCheck: true,
    hot: false,
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, use: [ "style-loader", "css-loader" ] },
      { test: /\.less$/, use: [ "style-loader", "css-loader", "less-loader" ] },
    ],
  },
  plugins: [
    ...htmlPlugins,
  ],
};
