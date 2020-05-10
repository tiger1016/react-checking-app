// Libraries
import { combineReducers } from 'redux'

// Reducers
import businessSnapshot from './dashboard-businessSnapshot-reducer'
import busyHours from './dashboard-busyHours-reducer'
import customerBase from './dashboard-customerBase-reducer'
import dailySnapshot from './dashboard-dailySnapshot-reducer'
import revenue from './dashboard-revenue-reducer'
import topZips from './dashboard-topZips-reducer'

export default combineReducers({
  businessSnapshot,
  busyHours,
  customerBase,
  dailySnapshot,
  revenue,
  topZips
})
