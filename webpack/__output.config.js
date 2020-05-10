// Libraries
const path = require('path')

// Constants
const {
  PUBLIC_DIR
} = require(path.join(__dirname, './__constants.config'))

const output = {
  filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash].js' : '[name].[hash].js',
  path: PUBLIC_DIR,
  publicPath: '/'
}

module.exports = output
