const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const base = require('./webpack.base')

base.mode = 'production'
base.output.filename = '[name].[chunkhash:8].js'
base.stats = { children: false }
base.optimization = {
  minimize: true,
  splitChunks: {
    chunks: 'all'
  }
}

// Plugins Configuration
base.plugins.push(
  new ProgressBarPlugin(),
  new ExtractTextPlugin('styles.[contenthash:8].css')
)

// Rules Configuration
base.module.rules.push({
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    extractCSS: true,
    preserveWhitespace: false
  }
})

base.module.rules.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract({
    use: [{ loader: 'css-loader?minimize=true' }, 'postcss-loader'],
    fallback: 'style-loader'
  })
})

module.exports = base
