// Libraries
const path = require('path')

// Constants
const {
  BUILD_TARGET,
  ENV,
  WEBPACK_DIR
} = require(path.join(__dirname, './webpack/__constants.config'))

console.log('Building webpack for target:', BUILD_TARGET)

// BUILD CONFIG OBJECT
let config = {
  context: __dirname,
  entry: require(path.join(WEBPACK_DIR, '__entry.config')),
  mode: ENV || 'production',
  module: require(path.join(WEBPACK_DIR, '__module.config')),
  node: { __filename: true, __dirname: true },
  output: require(path.join(WEBPACK_DIR, '__output.config')),
  plugins: require(path.join(WEBPACK_DIR, '__plugins.config')),
  resolve: require(path.join(WEBPACK_DIR, '__resolve.config'))
}

// CONDITIONAL CONFIG
if (ENV === 'development') {
  config.devtool = require(path.join(WEBPACK_DIR, '__devTool.config'))
  if (BUILD_TARGET === 'local') {
    process.traceDeprecation = true
    config.devServer = require(path.join(WEBPACK_DIR, '__devServer.config'))
  }
}

module.exports = config
