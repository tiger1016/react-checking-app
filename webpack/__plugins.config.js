// Libraries
const path = require('path')
const webpack = require('webpack')

// Webpack plugins
const CircularDependencyPlugin = require('circular-dependency-plugin')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Constants
const {
  BASE,
  BUILD_TARGET,
  ENV,
  PLATFORM,
  REACT_APP_TITLE,
  REACT_GOOGLE_MAPS_API_KEY
} = require(path.join(__dirname, './__constants.config'))

// PLUGINS EXPORT ARRAY
let plugins = []

// DEFINE PLUGIN
plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      BUILD_TARGET: JSON.stringify(BUILD_TARGET),
      NODE_ENV: JSON.stringify(ENV),
      PLATFORM_ENV: JSON.stringify(PLATFORM)
    }
  })
)

// OCURRANCE ORDER PLUGIN
plugins.push(
  new webpack.optimize.OccurrenceOrderPlugin()
)

// PLUGINS BASED ON ENVIROMENT AND BUILD TARGET
if (ENV === 'development') {
  if (BUILD_TARGET === 'local') {
    // HOT MODULE REPLACEMENT PLUGIN
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    )
  }

  // NO EMIT ERRORS PLUGIN
  // plugins.push(
  //   new webpack.noEmitOnErrors()
  // )
}

// Dotenv
plugins.push(
  new Dotenv({
    systemvars: process.env.REACT_APP_WITH_SYSTEMVARS || false
  })
)

// Circular dependency detection
plugins.push(
  new CircularDependencyPlugin({
    // exclude detection of files based on a RegExp
    exclude: /a\.js|node_modules/,
    // add errors to webpack instead of warnings
    failOnError: true,
    // set the current working directory for displaying module paths
    cwd: process.cwd()
  })
)

// HTML plugin
plugins.push(
  new HtmlWebpackPlugin({
    appMountId: 'root',
    base: BASE,
    environment: process.env,
    googleMapsApiKey: REACT_GOOGLE_MAPS_API_KEY,
    inject: false,
    buildTarget: BUILD_TARGET,
    title: REACT_APP_TITLE,
    template: 'public/index.html'
  })
)

module.exports = plugins
