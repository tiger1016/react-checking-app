// Libraries
const path = require('path')

// Constants
const {
  PUBLIC_DIR
} = require(path.join(__dirname, './__constants.config'))

module.exports = {
  contentBase: PUBLIC_DIR,
  compress: true,
  historyApiFallback: true,
  hot: true,
  host: process.env.WEBPACK_HOST || '0.0.0.0',
  inline: true,
  open: !process.env.HEADLESS,
  port: process.env.PORT || 3000
}
