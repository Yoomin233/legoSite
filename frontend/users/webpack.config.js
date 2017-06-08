const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    login: './src/login.js',
    register: './src/register.js'
  },
  output: {
    path: path.join(__dirname, '/javascripts/'),
    filename: '[name].js',
    publicPath: '/javascripts/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}
