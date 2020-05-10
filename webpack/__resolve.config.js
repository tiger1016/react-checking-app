// Libraries
const path = require('path')

// Constants
const {
  COMMON_DIR, SHARED_DIR, SRC_DIR
} = require(path.join(__dirname, './__constants.config'))

module.exports = {
  alias: {
    Actions: path.resolve(COMMON_DIR, 'actions/'),
    Assets: path.resolve(COMMON_DIR, 'assets/'),
    Config: path.resolve(COMMON_DIR, 'config/'),
    Constants: path.resolve(COMMON_DIR, 'constants/'),
    Controllers: path.resolve(COMMON_DIR, 'controllers/'),
    Functions: path.resolve(COMMON_DIR, 'functions/'),
    GlobalComponents: path.resolve(SRC_DIR, 'globalComponents/'),
    GlobalContainers: path.resolve(SRC_DIR, 'globalContainers/'),
    Helpers: path.resolve(COMMON_DIR, 'helpers/'),
    InitialState: path.resolve(COMMON_DIR, 'initialstate/'),
    Mobile: path.resolve(SRC_DIR, 'petcheck-mobile/'),
    Models: path.resolve(COMMON_DIR, 'models/'),
    'react-native': 'react-native-web',
    Reducers: path.resolve(COMMON_DIR, 'reducers/'),
    Selectors: path.resolve(COMMON_DIR, 'selectors/'),
    Shared: path.resolve(SHARED_DIR),
    Store: path.resolve(COMMON_DIR, 'store/'),
    Utils: path.resolve(COMMON_DIR, 'utils/'),
    Web: path.resolve(SRC_DIR)
  }
}
