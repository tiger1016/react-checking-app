// Constants
import {
  FETCH_ALERTS_REQUESTED,
  FETCH_ALERTS_SUCCEDED,
  FETCH_ALERTS_REJECTED,
  GET_LAST_ALERT,
  SET_READ_ALERT
} from '../constants/alerts/Actions'

// Initial state
import initialstate from '../initialstate/alerts-init'

// Models
import { alertsModel } from '../models/alertsModel'

export default (state = initialstate, action) => {
  switch (action.type) {
    /*
    Requested
    */
    case FETCH_ALERTS_REQUESTED:
      return alertsModel.loadingWithMessage(state, { message: action.payload })

    /*
    Rejected
    */
    case FETCH_ALERTS_REJECTED:
      return alertsModel.error(state, { error: action.payload })

    /*
    Succeded
    */
    case FETCH_ALERTS_SUCCEDED:
      const isAlertPage = window.location.pathname.includes('/alerts')
      return alertsModel.updateAlerts(state, { alerts: action.payload, isAlertPage })
    case GET_LAST_ALERT:
      return alertsModel.getLastAlert(state, action.payload)
    case SET_READ_ALERT:
      return alertsModel.setReadAlert(state, action.payload)
  }
  return state
}
