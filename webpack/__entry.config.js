// Libraries
const path = require('path')

// Constants
const {
  BUILD_TARGET,
  ENTRY_FILE,
  ENV
} = require(path.join(__dirname, './__constants.config'))

let entry = [
  '@babel/polyfill',
  ENTRY_FILE
]

if (ENV === 'development' && BUILD_TARGET === 'local') {
  entry = [
    'webpack-dev-server/client',
    'webpack/hot/dev-server',
    '@babel/polyfill',
    ENTRY_FILE
  ]
}

module.exports = entry
