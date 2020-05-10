// Libraries
require('dotenv').config()
const path = require('path')

const {
  NODE_ENV,
  WEBPACK_BUILD_TARGET
} = process.env

// Build Target
const buildTarget = WEBPACK_BUILD_TARGET || 'production-server'

// Public Dir
let publicDir = path.join(__dirname, '../dist/')
// if (buildTarget === 'staging-server') {
//   publicDir = path.join(__dirname, '../../../petcheck2.0/')
if (buildTarget === 'local') {
  publicDir = path.join(__dirname, '../public/')
}

module.exports = {
  APP_ROOT: path.join(__dirname, '../'),
  BASE: process.env.BASE,
  BUILD_TARGET: buildTarget,
  COMMON_DIR: path.join(__dirname, '../common/src'),
  ENTRY_FILE: path.join(__dirname, '../src/index.js'),
  ENV: NODE_ENV || 'production',
  PLATFORM: 'web',
  PUBLIC_DIR: publicDir,
  REACT_APP_TITLE: process.env.REACT_APP_TITLE,
  REACT_GOOGLE_MAPS_API_KEY: process.env.REACT_GOOGLE_MAPS_API_KEY,
  ROOT_DIR: path.join(__dirname, '../'),
  SHARED_DIR: path.join(__dirname, '../shared/src'),
  SRC_DIR: path.join(__dirname, '../src'),
  VECTOR_ICONS: path.resolve(__dirname, '../node_modules/react-native-vector-icons'),
  WEBPACK_DIR: path.join(__dirname)
}
