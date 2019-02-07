const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = (process.env.NODE_ENV === 'production');

module.exports = {
  entry: {
    jamesBabylon: path.join(__dirname, isProduction ? '/src/index.ts' : '/src/indexDev.js')
  },
  output: isProduction ?
    {
      path: path.join(__dirname, 'build'),
      library: 'jamesBabylon',
      libraryTarget: 'umd',
      filename: '[name].js'
    } :
    {
      path: path.join(__dirname, 'www'),
      filename: '[name].js'
    },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use:
          {
            loader: 'babel-loader',
            options: {
              compact: true,
              babelrc: false,
              presets: ['env']
            }
          }
      }
    ]
  },
  plugins: isProduction ? [] :
    [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
        inject: 'head',
        defer: ['bundle'],
        hash: true
      })
    ]
};