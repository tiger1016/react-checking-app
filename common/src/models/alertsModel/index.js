// Models
import BaseModel from '../baseModel'
import { notify } from '../../functions/app'

export default class AlertsModel extends BaseModel {
  /**
   * [updateProfile description]
   * @param  {[type]} state        [description]
   * @param  {[type]} options.data [description]
   * @return {[type]}              [description]
   */
  updateAlerts (state, { alerts, isAlertPage }) {
    let unreadAlerts = 0
    const totalAlerts = alerts.total
    if (totalAlerts && totalAlerts.length) {
      const lastAlertId = state.lastAlertId || totalAlerts[0].id
      if (lastAlertId) {
        const alertIdx = totalAlerts.findIndex(alert => alert.id === lastAlertId)
        if (alertIdx !== -1) {
          unreadAlerts = alertIdx
          alerts.total = alerts.total.map((alert, idx) => {
            if (idx < alertIdx) {
              alert.unread = true
            }

            return alert
          })
        } else {
          // if there is no alerts matchted, set 0
          unreadAlerts = 0
        }
      }

      if (!isAlertPage && unreadAlerts) {
        notify('info', `There are ${unreadAlerts} alerts to review.`)
      }

      return {
        ...state,
        error: null,
        loading: false,
        loadingMessage: null,
        loadingLogo: false,
        alerts,
        unreadAlerts: isAlertPage ? 0 : unreadAlerts,
        lastAlertId: isAlertPage ? totalAlerts[0].id : lastAlertId
      }
    } else {
      return {
        ...state,
        error: null,
        loading: false,
        loadingMessage: null,
        loadingLogo: false,
        alerts: []
      }
    }
  }

  getLastAlert (state, lastAlertId) {
    return {
      ...state,
      lastAlertId
    }
  }

  setReadAlert (state, alertId) {
    const newAlert = {}
    Object.keys(state.alerts).forEach(alertGroup => {
      newAlert[alertGroup] = state.alerts[alertGroup].map(alert => {
        if (alert.unread && alert.id === alertId) {
          alert.unread = false
        }
        return alert
      })
    })

    return {
      ...state,
      alerts: newAlert
    }
  }
}

export const alertsModel = new AlertsModel()
