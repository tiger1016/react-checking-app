// Libraries
const path = require('path')

// Constants
const {
  // BUILD_TARGET,
  // ENV,
  VECTOR_ICONS_DIR
} = require(path.join(__dirname, './__constants.config'))

// Module object
const m = {
  rules: []
}

// CSS --------------------
m.rules.push({
  test: /\.css$/,
  loader: 'style-loader!css-loader'
})

// JS / JSX --------------------
const js = {
  test: /\.jsx?$/,
  exclude: /node_modules\/(?!(react-native-vector-icons)\/).*/,
  loader: 'babel-loader',
  options: {
    babelrc: false,
    plugins: ['@babel/plugin-proposal-class-properties'],
    presets: ['@babel/preset-env', '@babel/preset-react']
  }
}
// if (ENV === 'development' && BUILD_TARGET === 'local') {
//   js.options.plugins = [[
//     'react-transform', {
//       transforms: [{
//         transform: 'react-transform-hmr',
//         imports: ['react'],
//         locals: ['module']
//       }]
//     }
//   ]]
// }
m.rules.push(js)

// IMG
m.rules.push({
  test: /\.(jpe?g|png|gif|svg)$/i,
  loaders: [
    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
    // 'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
  ]
})

// VECTOR ICONS
m.rules.push({
  test: /\.ttf$/,
  loader: 'url-loader', // or directly file-loader
  include: VECTOR_ICONS_DIR
})

module.exports = m
