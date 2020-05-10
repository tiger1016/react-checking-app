// Libraries
// import { AsyncStorage } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { routerMiddleware } from 'react-router-redux'

// Persist Config
import persistConfig from './persistConfig'

// Custom Middleware
import { hydrateControllers, syncDispatcher } from './middlewares'

// Reducers
import reducer from '../reducers'

// Concetent
import { DESTROY_SESSION } from '../constants/session/Actions'

// const saveAlertInfo = (userId, lastAlertId) => {
// const alertData = AsyncStorage.getItem('lastknownAlertId')  // eslint-disable-line
// let existingUserAlerts = []
// if (alertData) {
//   existingUserAlerts = JSON.parse(alertData)
//   const alertIndex = existingUserAlerts.findIndex(alert => alert.userId === userId)
//   if (alertIndex !== -1) {
//     existingUserAlerts[alertIndex] = { userId, lastAlertId }
//   } else {
//     existingUserAlerts.push({ userId, lastAlertId })
//   }
// }

// AsyncStorage.setItem('lastknownAlertId', JSON.stringify(existingUserAlerts))  // eslint-disable-line
// }

const rootReducer = (state, action) => {
  if (action.type === DESTROY_SESSION) {
    // const isLicensee = (state.session.user && state.session.user.type) === 2
    // if (isLicensee) {
    // const lastAlertId = state.alerts.lastAlertId
    // saveAlertInfo(state.session.user.user_id, lastAlertId)
    // }
    state = undefined
  }
  return reducer(state, action)
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

// React Router
const router = routerMiddleware()

const configureStore = compose(
  applyMiddleware(thunk, router, hydrateControllers, syncDispatcher)
)(createStore)

const store = configureStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }
persistor.purge()
